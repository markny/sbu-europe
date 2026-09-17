"""Project Natural Earth's public-domain country boundaries for the route map.

Input: ne_50m_admin_0_countries.geojson from nvkelso/natural-earth-vector.
Usage: python3 scripts/build-route-map.py /path/to/source.geojson
"""
import json
import math
from pathlib import Path
import sys

WEST, SOUTH, EAST, NORTH = 7.3, 46.8, 19.6, 55.05
WIDTH = 720

def mercator(latitude):
    return math.degrees(math.log(math.tan(math.pi / 4 + math.radians(latitude) / 2)))

SCALE = WIDTH / (EAST - WEST)
HEIGHT = round((mercator(NORTH) - mercator(SOUTH)) * SCALE, 2)

def project(point):
    lon, lat = point
    return [round((lon - WEST) * SCALE, 2), round((mercator(NORTH) - mercator(lat)) * SCALE, 2)]

def clip(ring):
    points = ring
    for axis, bound, greater in [(0, WEST, True), (0, EAST, False), (1, SOUTH, True), (1, NORTH, False)]:
        output = []
        if not points:
            break
        previous = points[-1]
        prev_inside = previous[axis] >= bound if greater else previous[axis] <= bound
        for current in points:
            inside = current[axis] >= bound if greater else current[axis] <= bound
            if inside != prev_inside:
                ratio = (bound - previous[axis]) / (current[axis] - previous[axis])
                output.append([previous[0] + ratio * (current[0] - previous[0]), previous[1] + ratio * (current[1] - previous[1])])
            if inside:
                output.append(current)
            previous, prev_inside = current, inside
        points = output
    return points

features = json.loads(Path(sys.argv[1]).read_text())['features']
countries = []
for feature in features:
    geometry = feature['geometry']
    polygons = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
    paths = []
    for polygon in polygons:
        for ring in polygon:
            clipped = clip(ring)
            if len(clipped) < 3:
                continue
            xy = [project(point) for point in clipped]
            paths.append('M' + 'L'.join(f'{x},{y}' for x, y in xy) + 'Z')
    if paths:
        name = feature['properties']['ADMIN']
        countries.append({'name': name, 'visited': name in ['Austria', 'Czechia', 'Germany'], 'path': ''.join(paths)})

labels = [
    ('GERMANY', 10.1, 50.7), ('CZECHIA', 16.0, 49.2), ('AUSTRIA', 13.5, 47.35),
    ('POLAND', 17.7, 52.5), ('SLOVAKIA', 18.45, 48.85), ('HUNGARY', 18.15, 47.4),
    ('DENMARK', 10.2, 54.85), ('North Sea', 7.95, 54.0), ('Baltic Sea', 14.95, 54.65)
]
result = {
    'width': WIDTH, 'height': HEIGHT, 'bounds': [WEST, SOUTH, EAST, NORTH],
    'projection': 'Mercator', 'source': 'Natural Earth, 1:50m admin 0 countries',
    'sourceUrl': 'https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_50m_admin_0_countries.geojson',
    'licenseUrl': 'https://www.naturalearthdata.com/about/terms-of-use/',
    'countries': countries,
    'labels': [{'text': text, 'point': project([lon, lat]), 'water': 'Sea' in text} for text, lon, lat in labels]
}
Path('src/data/centralEuropeMap.json').write_text(json.dumps(result, separators=(',', ':')) + '\n')
print(f'{len(countries)} country outlines; {WIDTH} × {HEIGHT} map')

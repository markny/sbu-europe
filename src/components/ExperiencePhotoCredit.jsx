import photoSources from '../data/destinationPhotoSources.json'

const originalCredits = Object.fromEntries(photoSources.map((photo) => [photo.city, photo]))
const credits = {
  ...originalCredits,
  vienna: { credit: 'Olivia · 2025 SBU trip' },
  schonbrunn: { credit: 'Olivia · 2025 SBU trip' },
  bratislava: { credit: 'Ingo Mehling', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bratislava_Castle_with_Danube.jpeg', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/' },
  baltic: { credit: 'Richard Maack', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Germany,_Lubeck,_Holsten_Gate_(Holstentor)_150503-21.jpg', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' },
  belvedere: { credit: 'Olga1969', sourceUrl: 'https://commons.wikimedia.org/wiki/File:Belvedere_palace.jpg', license: 'CC BY 4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/' }
}

export default function ExperiencePhotoCredit({ image }) {
  const photo = credits[image]
  if (!photo) return null
  return <span className="eee-photo-credit">Photo: {photo.sourceUrl ? <a href={photo.sourceUrl} target="_blank" rel="noreferrer">{photo.credit}</a> : photo.credit}{photo.licenseUrl && <> · <a href={photo.licenseUrl} target="_blank" rel="noreferrer">{photo.license}</a> · display cropped</>}</span>
}

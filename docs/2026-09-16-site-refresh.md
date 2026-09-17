# Site refresh — September 16, 2026

## Scope and authorization

The user approved all 21 photographs in the Olivia review, asked to add them, improve existing captions, remove beta-site artifacts, and welcomed a revised layout. The changes were prepared in an isolated working copy and approved for commit and push. Original project files and source photographs are preserved.

The user specified the 2027 route as Vienna → Prague → Dresden, then Berlin and Hamburg with their order undecided. The site presents that distinction explicitly. Travel dates, price, eligibility, academic information, and booking details are not established by this update. A contact email or university page is still needed before adding an interest link.

## Photograph selections

The private review and full source inventory are retained separately from this repository. The source collection is the Olivia folder on the project owner’s external drive. That review describes the state before this approval; its original permission and publication notes have not been rewritten.

| City | Approved review IDs | Highlights | Complete collection |
| --- | --- | ---: | ---: |
| Vienna | V04, V05, V07, V13, V16 | 12 | 77 |
| Munich | M04, M09, M14, M17, M24, M27, M33 | 12 | 58 |
| Cologne | C03, C05, C06, C09, C11 | 10 | 29 |
| Amsterdam | A02, A06, A09, A12 | 11 | 38 |
| Total | 21 additions | 45 | 202 |

Each added file is named `olivia-2025-<review-id>.webp` in its city folder. All are exact copies of the reviewed files, credited as Olivia, and included in the highlights. `olivia-photo-sources.json` records source names and SHA-256 hashes. The 181 pre-existing photo files are unchanged.

All 202 catalog entries now have written captions and alternative text, using visual review of the photographs. Captions no longer come from filenames. Incorrect filename implications were removed; specific names are used when supported, with more general descriptions elsewhere. Tegernsee, Düsseldorf, and Ahr valley excursions are labeled separately from the main city scenes.

## Presentation

The warm paper-and-terracotta layout separates the ongoing program, the 2025 retrospective, and the 2027 route. Group photographs retain their full composition. The complete galleries remain available alongside the selected highlights. Mobile navigation, keyboard photo controls, focus restoration, and reduced-motion preferences are supported. Beta notices, soundtrack placeholders, and internal development instructions have been removed from the app.

## Validation

- Production Vite build completed successfully, with output directed to a temporary review directory so existing build artifacts were preserved.
- All seven main pages checked at 320, 390, 768, and desktop widths; no horizontal overflow or loaded-image failures found.
- Legacy city and looking-ahead links redirect correctly; unknown routes show a helpful not-found page.
- Phone navigation opens, navigates, and closes. Gallery highlights/all controls, modal opening, next/previous keyboard controls, Escape, background scroll lock, and focus restoration checked in the browser.
- All photo catalog paths resolve; approved additions match their source hashes, and existing photo bytes match the original tracked files.

The user approved the preview for commit and push. Public deployment status is determined by the Cloudflare Pages check for the corresponding GitHub commit.

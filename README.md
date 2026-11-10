# Koine Alphabet — Biblical Greek

A polished, installable Progressive Web App that teaches the 24 letters of the New Testament (Koine) Greek alphabet.

## Features
- Full alphabet with uppercase, lowercase, names, Erasmian pronunciation, tips, and biblical example words
- Flashcards
- Multiple-choice quiz
- Reference guide (sigma forms, nasal gamma, diphthongs, breathing marks)
- Progress tracking (localStorage)
- Offline support via service worker
- Installable on iOS / Android / desktop (Add to Home Screen)
- Clean mobile-first design with bottom navigation

## Pronunciation
Uses the common Erasmian system found in most New Testament Greek textbooks. Historical Koine pronunciation differed in places (e.g. β closer to “v”).

## How to publish / host
1. Upload the entire `koine-alphabet` folder to any static host:
   - Netlify (drag-and-drop)
   - Vercel
   - GitHub Pages
   - Cloudflare Pages
   - Your own server
2. Ensure the site is served over HTTPS (required for service workers and installability).
3. Users can then “Add to Home Screen” / “Install app”.

## Local testing
```bash
cd koine-alphabet
python3 -m http.server 8080
# open http://localhost:8080
```

## Files
- `index.html` — entry
- `style.css` — styles
- `app.js` — logic & data
- `manifest.json` — PWA manifest
- `sw.js` — service worker
- `icons/` — app icons

## App Store packaging
See [APP_STORE.md](APP_STORE.md) for complete step-by-step instructions to wrap this PWA with Capacitor and submit it to the Apple App Store (and optionally Google Play).

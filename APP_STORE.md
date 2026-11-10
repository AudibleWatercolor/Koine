# Packaging Koine Alphabet for the Apple App Store with Capacitor

This guide turns the existing Progressive Web App into a native iOS app using [Capacitor](https://capacitorjs.com) and submits it to the App Store.

**Important note on Apple Guideline 4.2 (Minimum Functionality)**  
Apple rejects pure website wrappers. This app already has strong offline functionality, local progress tracking, interactive quizzes, and flashcards — that helps. To improve approval chances:

- Keep all assets bundled (do **not** set `server.url` to a remote website).
- Emphasize the offline learning experience in the App Store description and review notes.
- Optional: add a simple native plugin (e.g. local notifications for daily practice reminders) via `@capacitor/local-notifications`.

You need a **Mac with Xcode** (latest version recommended) and a paid **Apple Developer Program** membership ($99/year).

---

## Prerequisites

1. Node.js 18+ and npm
2. Xcode (from the Mac App Store)
3. Apple ID enrolled in the [Apple Developer Program](https://developer.apple.com/programs/)
4. The `koine-alphabet` folder from this project

---

## 1. Prepare the project

```bash
cd koine-alphabet
npm init -y   # creates package.json if you don’t have one
```

(Optional but recommended) Move web assets into a `www` folder so Capacitor has a clean web directory:

```bash
mkdir www
cp index.html style.css app.js manifest.json sw.js www/
cp -r icons www/
```

Then set `webDir` to `www` in the next step.  
If you prefer to keep files in the root, set `webDir` to `.`.

---

## 2. Install and initialize Capacitor

```bash
npm install @capacitor/core
npm install -D @capacitor/cli
npx cap init "Koine Alphabet" com.yourcompany.koinealphabet --web-dir www
```

Replace `com.yourcompany.koinealphabet` with your own reverse-domain bundle ID (it must be unique and cannot be changed after the first App Store release).

This creates `capacitor.config.ts` (or `.json`). Example content:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.koinealphabet',
  appName: 'Koine Alphabet',
  webDir: 'www',
  server: {
    iosScheme: 'https'
  }
};

export default config;
```

---

## 3. Add the iOS platform

```bash
npm install @capacitor/ios
npx cap add ios
```

This creates an `ios/` folder with a full Xcode project.

---

## 4. Sync and open in Xcode

```bash
npx cap sync
npx cap open ios
```

Xcode opens the project (`ios/App/App.xcworkspace`).

---

## 5. Configure the iOS project in Xcode

1. Select the **App** target.
2. **Signing & Capabilities** → select your Team (Apple Developer account). Enable “Automatically manage signing”.
3. Set **Bundle Identifier** to match your `appId`.
4. **General** tab:
   - Display Name: Koine Alphabet
   - Version: 1.0
   - Build: 1
   - Deployment Target: iOS 15 or higher (recommended)
5. **Icons & Splash**:
   - Drag your `icons/icon-512.png` (and others) into the AppIcon asset catalog, or use Xcode’s App Icon generator.
   - Capacitor provides a default splash; customize if desired under `Assets.xcassets`.
6. (Optional) Add capabilities such as Push Notifications if you later add local notifications.

---

## 6. Test on simulator or device

- Choose a simulator or connect a physical iPhone.
- Click the Run button (or ⌘R).
- Verify offline mode, quizzes, progress, and navigation work correctly.
- Check safe areas (notch / home indicator) — the bottom nav should sit properly.

---

## 7. Prepare for App Store submission

### App Store Connect
1. Go to [appstoreconnect.apple.com](https://appstoreconnect.apple.com).
2. Create a new app with the same Bundle ID.
3. Fill in metadata: name, subtitle, description, keywords, screenshots (required for multiple device sizes), support URL, privacy policy URL.
4. Privacy Nutrition Labels: this app stores progress locally only — declare “Data Not Collected” or the minimal categories that apply.

### Build & Archive
1. In Xcode, select **Any iOS Device (arm64)** as the destination.
2. **Product → Archive**.
3. When the Organizer appears, click **Distribute App → App Store Connect → Upload**.
4. Wait for processing (usually 10–30 minutes).

### Submit for Review
1. In App Store Connect, select the build.
2. Complete the listing and export compliance questions (usually “No” for encryption).
3. Add review notes:  
   “This is a fully offline educational app for learning the Biblical (Koine) Greek alphabet. All content, quizzes, flashcards, and progress tracking run locally on the device with no network dependency after install.”
4. Submit for review.

---

## 8. After approval

- Updates to web content require a new `npx cap sync` + new archive + new review.
- For faster iteration later, consider a live-update service such as Capgo (optional).

---

## Optional: Android (Google Play)

```bash
npm install @capacitor/android
npx cap add android
npx cap open android
```

Then follow the standard Android Studio → Generate Signed Bundle process for Google Play.

---

## Troubleshooting

- **White screen**: Check that `webDir` points to the folder containing `index.html` and run `npx cap sync` again.
- **Signing errors**: Ensure your Apple Developer account is active and the Bundle ID is registered.
- **Guideline 4.2 rejection**: Add one clear native feature (local notifications, haptics, or Share sheet) and re-emphasize the offline learning value in the review notes.

---

## Quick command summary

```bash
npm install @capacitor/core @capacitor/ios
npm install -D @capacitor/cli
npx cap init "Koine Alphabet" com.yourcompany.koinealphabet --web-dir www
npx cap add ios
npx cap sync
npx cap open ios
# then Archive in Xcode → Upload to App Store Connect
```

You now have a path from the current PWA to a full App Store listing. The offline quizzes, flashcards, and progress tracking give the app real utility beyond a simple website wrapper.

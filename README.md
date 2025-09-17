# StickyTabExpo

A modern restaurant menu app built with Expo, React Native, and TypeScript. This project demonstrates a sticky tab navigation UI for browsing menu categories, with smooth scrolling and animated headers.

## Features

- **Sticky Tabs:** Category tabs remain visible as you scroll through menu sections.
- **Animated Header:** Parallax-style header image that collapses on scroll.
- **Category Sections:** Menu items grouped by category, each with images, descriptions, and prices.
- **Responsive UI:** Works on iOS, Android and web

## What Was Done

- Implemented a [`StickyTabs`](components/StickyTabs.tsx) component for sticky tab navigation and smooth section scrolling.
- Created mock restaurant menu data in [`mockData.ts`](data/mockData.ts).
- Built a sample home screen ([`index.tsx`](<app/(tabs)/index.tsx>)) using the sticky tabs and animated header.
- Added custom UI components for themed text, views, icons, and haptic tab buttons.
- Set up Expo Router for navigation and theming.
- Ensured cross-platform compatibility and responsive design.

## Installation

1. **Clone the repository:**

   ```sh
   git clone <your-repo-url>
   cd StickyTabExpo
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the app

   ```bash
   npx expo start
   ```

4. Open the app

   ```bash
   Use the Expo Go app on your device to scan the QR code, or
   Launch an emulator/simulator from the Expo CLI.
   ```

# StickyTabsExpo

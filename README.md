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

## Notes: Potential Improvements for StickyTabs Component and the whole task

- **Tab Scroll Performance:** Optimize tab bar rendering and scrolling for a smoother experience, especially with many categories.
- **Dynamic Tab Highlighting:** Improve accuracy and responsiveness of the active tab indicator as the user scrolls through sections.
- **Accessibility:** Enhance accessibility by supporting keyboard navigation and screen readers for tabs and sections.
- **Customizability:** Allow more flexible customization of tab styles, header heights, and animation parameters via props.
- **Section Indexing:** Add a quick-jump or index feature for faster navigation in menus with many categories.
- **Persistent Tab State:** Remember the last selected tab or scroll position when navigating away and back.
- **Animations:** Add more refined animations for tab transitions and header collapse/expand effects.
- **Testing:** Increase unit and integration test coverage for edge cases and user interactions.

# StickyTabsExpo

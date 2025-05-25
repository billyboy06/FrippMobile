# Fripp Mobile - React Native Clothing Swipe App

A React Native version of the Fripp web application - a Tinder-like interface for discovering and liking clothing items.

## Features

- **Swipe Interface**: Swipe left to dislike, right to like clothing items
- **Favorites**: View and manage your liked items
- **Smooth Animations**: Native animations for card swiping
- **Responsive Design**: Adapts to different screen sizes
- **TypeScript**: Full type safety throughout the app

## Prerequisites

- Node.js >= 16
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Install iOS dependencies (iOS only):
```bash
cd ios && pod install && cd ..
```

3. Install vector icons (follow react-native-vector-icons setup guide):
   - For Android: Add fonts to `android/app/src/main/assets/fonts/`
   - For iOS: Add fonts to iOS project and Info.plist

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

## Project Structure

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

You are an expert in React Native.  
I will provide few React Web component implementations.  you can find them here@src 
Your mission:  
1. **Faithfully reproduce** the logic and design of my React Web components in React Native.  
2. **Use React Native primitives** (`View`, `Text`, `Image`, `StyleSheet`, `TouchableOpacity`, etc.).  
3. **Apply best practices** to ensure performance and minimize regressions:  
   - Use `React.memo` or `useCallback` where appropriate,  
   - Use `useWindowDimensions` and `SafeAreaView` for mobile responsiveness,  
   - Use `FlatList` or `SectionList` for lists,  
   - Optimize images with `<Image>` settings like `resizeMode` and lazy loading.  
4. **Avoid Web-only APIs** (DOM elements, `localStorage`, `<a>` tags, etc.) and instead use mobile equivalents (AsyncStorage, React Navigation, etc.).  
5. **Provide**:  
   - Complete component code in TypeScript (or JavaScript if preferred),  
   - A clear `StyleSheet.create` block,  
   - Any required setup (imports, Babel/Reanimated configuration if needed),  
   - A short README explaining how to test and prevent regressions.  

**Now, please rewrite the web app in React Native in the @src folder.

I'll help you convert your React Web components to React Native. Let me first explore the structure of your web application to understand what components need to be converted.
Now let me examine each component to understand their functionality:
Now let me check the React Native project structure to understand where to place the converted components:
Perfect! Now I have a complete understanding of the React Web application. Let me convert it to React Native. The app is a clothing swipe app (like Tinder for clothes) with the following main features:
SplashScreen - Shows app logo and name
Header - Navigation with profile, search, and favorites
SwipeScreen - Main swipe interface with cards and action buttons
SwipeCard - Individual clothing item cards
FavoritesPage - Shows liked items
App - Main container with navigation logic
Let me start by creating the React Native version:
1. App.tsx (Main Container)
Apply
2. Header Component
Apply
;
3. SwipeCard Component
Apply
;
4. SwipeScreen with React Native Reanimated
Apply
;
5. FavoritesScreen
Apply
;
6. SplashScreen Component
Apply
;
7. Package.json Dependencies
8. Setup Instructions & README
src/
├── components/
│ ├── Header.tsx # Navigation header with search
│ ├── SwipeCard.tsx # Individual clothing item card
│ └── SplashScreen.tsx # App loading screen
├── screens/
│ ├── SwipeScreen.tsx # Main swipe interface
│ └── FavoritesScreen.tsx # Liked items grid
├── types/
│ └── index.ts # TypeScript type definitions
└── App.tsx # Main app container

## Key Components

### SwipeScreen
- Implements card swiping with PanResponder
- Handles like/dislike logic
- Provides undo functionality
- Auto-resets when all cards are swiped

### SwipeCard
- Displays clothing item information
- Optimized images with proper resizeMode
- Gradient overlay for text readability

### FavoritesScreen
- Grid layout using FlatList
- Responsive columns based on screen size
- Empty state with call-to-action

### Header
- Search functionality (UI only)
- Navigation between screens
- Active state indicators

## Performance Optimizations

1. **React.memo**: All components are memoized to prevent unnecessary re-renders
2. **useCallback**: Event handlers are memoized
3. **FlatList**: Used for efficient list rendering in favorites
4. **Image Optimization**: Proper resizeMode and lazy loading
5. **Native Animations**: Uses Animated API for smooth performance

## Testing

Run tests with:
```bash
npm test
```

## Preventing Regressions

1. **Type Safety**: Full TypeScript coverage prevents runtime errors
2. **Component Isolation**: Each component has clear props interface
3. **Performance Monitoring**: Use React DevTools Profiler to monitor renders
4. **Memory Management**: Proper cleanup of timers and animations
5. **Testing**: Unit tests for critical business logic

## Troubleshooting

### Common Issues

1. **Vector Icons not showing**: Ensure fonts are properly linked
2. **Android build fails**: Check Android SDK and build tools versions
3. **iOS build fails**: Run `pod install` and check Xcode version
4. **Metro bundler issues**: Clear cache with `npx react-native start --reset-cache`

### Performance Issues

1. Monitor component re-renders with React DevTools
2. Use Flipper for debugging animations
3. Profile with Xcode Instruments (iOS) or Android Studio Profiler

## Future Enhancements

- [ ] Add React Native Reanimated 3 for more complex animations
- [ ] Implement AsyncStorage for persistence
- [ ] Add React Navigation for better navigation
- [ ] Implement search functionality
- [ ] Add user authentication
- [ ] Integrate with backend API

# Key Differences from Web Version

1. **Animations**: Replaced `@react-spring/web` with React Native's `Animated` API
2. **Icons**: Used `react-native-vector-icons` instead of `react-icons`
3. **Styling**: Converted CSS classes to `StyleSheet.create`
4. **Gestures**: Implemented `PanResponder` for swipe gestures
5. **Layout**: Used `useWindowDimensions` for responsive design
6. **Images**: Used React Native `Image` component with proper `resizeMode`
7. **Lists**: Used `FlatList` for efficient rendering
8. **Safe Areas**: Added `SafeAreaView` for proper mobile layout

The React Native version maintains all the functionality of the web version while following React Native best practices for performance and user experience.
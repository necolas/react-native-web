import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { Root } from 'react-dom/client';
import type {
  AppRegistry as AppRegistryRN,
  StyleSheet as StyleSheetRN
} from 'react-native';

export {
  AccessibilityInfo,
  ActivityIndicator,
  Alert,
  Animated,
  Appearance,
  AppState,
  AssetRegistry,
  BackHandler,
  Button,
  Clipboard,
  DeviceEventEmitter,
  Dimensions,
  Easing,
  findNodeHandle,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  InputAccessoryView,
  Keyboard,
  KeyboardAvoidingView,
  LayoutAnimation,
  Linking,
  LogBox,
  Modal,
  NativeEventEmitter,
  NativeModules,
  PanResponder,
  PixelRatio,
  Platform,
  PlatformColor,
  Pressable,
  processColor,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  Share,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  UIManager,
  useAnimatedColor,
  useAnimatedValue,
  useAnimatedValueXY,
  useColorScheme,
  useWindowDimensions,
  Vibration,
  View,
  VirtualizedList
} from 'react-native';

// See src/exports/AppRegistry/renderApplication.tsx
type Application = { unmount(): void };

export const AppRegistry: Pick<
  typeof AppRegistryRN,
  | 'getAppKeys'
  | 'registerComponent'
  | 'registerConfig'
  | 'registerRunnable'
  | 'setComponentProviderInstrumentationHook'
  | 'setWrapperComponentProvider'
> & {
  unmountApplicationComponentAtRootTag(rootTag: Application): void;
  runApplication(
    appKey: string,
    appParameters: {
      rootTag: Element;
      initialProps?: object;
      hydrate?: boolean;
      callback?: () => void;
    }
  ): Application;
  getApplication(
    appKey: string,
    appParameters?: { initialProps?: object }
  ): {
    element: ReactElement;
    getStyleElement: (props?: object) => ReactElement;
  };
};

// See src/exports/StyleSheet/index.ts
export const StyleSheet: Omit<
  typeof StyleSheetRN,
  'setStyleAttributePreprocessor'
> & {
  getSheet(): { id: string; textContent: string };
};

export function render(element: ReactNode, root: Element): Root;

export function unmountComponentAtNode(root: Root): boolean;

export function unstable_createElement(
  component: string | ComponentType<any>,
  props?: object | null,
  options?: object,
  ...children: ReactNode[]
): ReactElement;

export function useLocaleContext(): {
  direction: 'ltr' | 'rtl';
  locale: string | null | undefined;
};

import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { Root } from 'react-dom/client';
import type {
  AppRegistry as AppRegistryRN,
  StyleSheet as StyleSheetRN
} from 'react-native';

export {
  findNodeHandle,
  processColor,
  NativeModules,
  AccessibilityInfo,
  Alert,
  Animated,
  Appearance,
  AppState,
  AssetRegistry,
  BackHandler,
  Clipboard,
  Dimensions,
  Easing,
  I18nManager,
  Keyboard,
  LayoutAnimation,
  Linking,
  NativeEventEmitter,
  PanResponder,
  PixelRatio,
  Platform,
  Share,
  UIManager,
  Vibration,
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  ImageBackground,
  InputAccessoryView,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  SectionList,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  VirtualizedList,
  LogBox,
  DeviceEventEmitter,
  useAnimatedColor,
  useAnimatedValue,
  useAnimatedValueXY,
  useColorScheme,
  useWindowDimensions
} from 'react-native';

// See src/exports/AppRegistry/renderApplication.js
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

// See src/exports/StyleSheet/index.js
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

# Internationalization

To support right-to-left languages, application layout can be automatically
flipped from LTR to RTL. The `I18nManager` API can be used to help with more
fine-grained control and testing of RTL layouts.

## Working with icons and images

Icons and images that must match the LTR or RTL layout of the app need to be manually flipped.

Either use a transform style:

```js
<Image
  source={...}
  style={{ transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }] }}
/>
```

Or replace the source asset:

```js
import imageSourceLTR from './back.png';
import imageSourceRTL from './forward.png';

<Image
  source={I18nManager.isRTL ? imageSourceRTL : imageSourceLTR}
/>
```

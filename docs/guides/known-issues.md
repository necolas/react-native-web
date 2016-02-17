# Known issues

## Missing modules and Views

This is an initial release of React Native for Web, therefore, not all of the
views present on iOS/Android are released on Web. We are very much interested in
the community's feedback on the next set of modules and views.

Not all the modules or views for iOS/Android can be implemented on Web. In some
cases it will be necessary to use a Web counterpart.

## Missing component props

There are properties that do not work across all platforms. All web-specific
props are annotated with `(web)` in the documentaiton.

## Platform parity

There are some known issues in React Native where APIs could be made more
consistent between platforms. For example, React Native for Web includes
`ActivityIndicator` and a horizontal `ProgressBar`.

Other parts of React Native, such as the `Animated` and `PanResponder` APIs,
are highly complex and have not yet been ported to React Native for Web. Given
the difficulties keeping these APIs in sync with React Native, we'd prefer the
APIs to be published as separate npm packages. If not, we will consider a web
implementation, possibly using the [Web Animations
API/polyfill](https://github.com/web-animations/web-animations-js)

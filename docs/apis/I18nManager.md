# I18nManager

Control and set the layout and writing direction of the application.

## Properties

**isRTL**: bool = false

Whether the application is currently in RTL mode.

## Methods

static **allowRTL**(allowRTL: bool)

Allow the application to display in RTL mode.

static **forceRTL**(forceRTL: bool)

Force the application to display in RTL mode.

static **setPreferredLanguageRTL**(isRTL: bool)

Set the application's preferred writing direction to RTL. You will need to
determine the user's preferred locale server-side (from HTTP headers) and
decide whether it's an RTL language.

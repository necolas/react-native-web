# I18nManager

Control and set the layout and writing direction of the application. You must
set `dir="rtl"` (and should set `lang="${lang}"`) on the root element of your
app.

## Properties

**isRTL**: bool = false

Whether the application is currently in RTL mode.

## Methods

static **allowRTL**(allowRTL: bool)

Allow the application to display in RTL mode.

static **forceRTL**(allowRTL: bool)

Force the application to display in RTL mode.

static **setRTL**(allowRTL: bool)

Set the application to display in RTL mode. You will need to determine the
user's preferred locale and if it is an RTL language. (This is best done on the
server as it is notoriously inaccurate to deduce client-side.)

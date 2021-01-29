---
title: TextInput
date: Last Modified
permalink: /docs/text-input/index.html
eleventyNavigation:
  key: TextInput
  parent: Components
---

{% import "fragments/macros.html" as macro with context %}

:::lead
Accessible single- and multi-line text input via a keyboard.
:::

Supports features such as auto-complete, auto-focus, placeholder text, and event callbacks. Note: some props are exclusive to or excluded from `multiline`.

```jsx
import TextInput from 'react-gui/text-input';

<TextInput {...props} />;
```

---

## API

### Props

{% call macro.prop('...AccessibilityProps') %}
The [accessibility props]({{ '/docs/accessibility' | url }}).
{% endcall %}

{% call macro.prop('...ClickProps') %}
The [click props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('...FocusProps') %}
The [focus props]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('autoCapitalize', '?string') %}
Equivalent to [HTMLElement.autocapitalize](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize).
{% endcall %}

{% call macro.prop('autoComplete', '?string') %}
Equivalent to [HTMLElement.autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocomplete).
{% endcall %}

{% call macro.prop('autoCorrect', '?("on" | "off")') %}
A string indicating whether or not auto-correct behavior is on or off. Safari only.
{% endcall %}

{% call macro.prop('autoFocus', '?boolean = false') %}
If `true`, focuses the input on mount. Only the first form element in a document with auto-focus is focused.
{% endcall %}

{% call macro.prop('blurOnSubmit', '?boolean') %}
If `true`, the text field will blur when submitted. The default value is `true` for single-line fields and `false` for multiline fields. Note, for multiline fields setting `blurOnSubmit` to `true` means that pressing return will blur the field and trigger the `onSubmitEditing` event instead of inserting a newline into the field.
{% endcall %}

{% call macro.prop('clearTextOnFocus', '?boolean = false') %}
If `true`, clears the text field automatically when focused.
{% endcall %}

{% call macro.prop('dataSet', '?Object') %}
Equivalent to [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLOrForeignElement/dataset).
{% endcall %}

{% call macro.prop('defaultValue', '?string') %}
The initial value of the input. Useful for simple use-cases where you don't want to deal with listening to events and updating the value prop to keep the controlled state in sync.
{% endcall %}

{% call macro.prop('direction', '?("auto" | "ltr" | "rtl") = "auto"') %}
Equivalent to [HTMLElement.dir](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dir)
{% endcall %}

{% call macro.prop('disabled', '?boolean = false') %}
Equivalent to [HTMLElement.disabled](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled)
{% endcall %}

{% call macro.prop('editable', '?boolean = true') %}
Equivalent to [HTMLElement.readonly](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly)
{% endcall %}

{% call macro.prop('keyboardType', '?string') %}
Hints at the type of data that might be entered by the user while editing the element or its contents. Equivalent to [HTMLElement.inputMode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode). Safari iOS requires an ancestral <form action> element to display the search keyboard. (Not available when multiline is true.)
{% endcall %}

{% call macro.prop('lang', '?string') %}
Equivalent to [HTMLElement.lang](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).
{% endcall %}

{% call macro.prop('maxLength', '?string') %}
Equivalent to [HTMLElement.maxlength](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/maxlength).
{% endcall %}

{% call macro.prop('multiline', '?boolean = false') %}
If `true`, the text input can be multiple lines.
{% endcall %}

{% call macro.prop('nativeID', '?string') %}
Equivalent to [HTMLElement.id](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id).
{% endcall %}

{% call macro.prop('numberOfLines', '?number = 1') %}
Sets the number of lines for a multiline input. (Requires `multiline` to be `true`.)
{% endcall %}

{% call macro.prop('onChange', '?(e: ChangeEvent) => void') %}
Equivalent to the React DOM `ChangeEvent`.
{% endcall %}

{% call macro.prop('onChangeText', '?(text: string) => void') %}
Called when the text content of the input changes.
{% endcall %}

{% call macro.prop('onContentSizeChange', '?({ nativeEvent: { contentSize: { width, height } } }) => void') %}
Callback that is called when the text input's content size changes.
{% endcall %}

{% call macro.prop('onKeyPress', '?(e: KeyboardEvent) => void') %}
Equivalent to the [onKeyDown prop]({{ '/docs/interactions' | url }}).
{% endcall %}

{% call macro.prop('onLayout', '?({ nativeEvent: { layout: { x, y, width, height } } }) => void') %}
This is invoked when a component is mounted and when its layout changes. `x` and `y` are the offsets from the parent node.
{% endcall %}

{% call macro.prop('onScroll', '?(e: ScrollEvent) => void') %}
Called during scrolling.
{% endcall %}

{% call macro.prop('onSelectionChange', '?({ nativeEvent: { selection: { start, end } } }) => void') %}
Callback that is called when the text input's selection changes.
{% endcall %}

{% call macro.prop('onSubmitEditing', '?() => void') %}
Callback that is called when the keyboard's submit button is pressed. When `multiline={true}`, this is only called if `blurOnSubmit={true}`.
{% endcall %}



{% call macro.prop('placeholder', '?boolean') %}
Text that appears in the form control when it has no value set.
{% endcall %}

{% call macro.prop('placeholderTextColor', '?string') %}
Equivalent to defining `::placeholder { color }` via a CSS property.
{% endcall %}

{% call macro.prop('required', '?boolean') %}
Equivalent to [HTMLElement.required](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required)
{% endcall %}

{% call macro.prop('returnKeyType', '?string') %}
Specifies what action label (or icon) to present for the enter key on virtual keyboards. Equivalent to [HTMLElement.enterkeyhint](https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-enterkeyhint-attribute)
{% endcall %}

{% call macro.prop('secureTextEntry', '?boolean = false') %}
Set to `true` for passwords and other sensitive data. Equivalent to HTMLInputElement ["password" `type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password). (Not available when `multiline` is `true`.)
{% endcall %}

{% call macro.prop('selectTextOnFocus', '?boolean = false') %}
If `true`, all text will automatically be selected on focus.
{% endcall %}

{% call macro.prop('spellCheck', '?boolean') %}
Equivalent to [HTMLElement.spellcheck](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck)
{% endcall %}

{% call macro.prop('style', '?Style') %}
Set the styles of the view. `TextInput` supports typographic styles in addition to those of `View`.
{% endcall %}

{% call macro.prop('testID', '?string') %}
Set the test selector label (via `data-testid`).
{% endcall %}

{% call macro.prop('value', '?string') %}
The value of the input when using it as a controlled component.
{% endcall %}

### Instance methods

{% call macro.prop('blur', '() => void') %}
Blur the underlying DOM input.
{% endcall %}

{% call macro.prop('clear', '() => void') %}
Clear the text from the underlying DOM input.
{% endcall %}

{% call macro.prop('focus', '() => void') %}
Focus the underlying DOM input.
{% endcall %}

{% call macro.prop('isFocused', '() => boolean') %}
Returns `true` if the input is currently focused; `false` otherwise.
{% endcall %}

---

## Examples

{{ macro.codesandbox('text-input') }}

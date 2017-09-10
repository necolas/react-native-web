/* eslint-disable react/jsx-sort-props */

/**
 * @flow
 */

import PropAutoCapitalize from './examples/PropAutoCapitalize';
import PropBlurOnSubmit from './examples/PropBlurOnSubmit';
import PropClearTextOnFocus from './examples/PropClearTextOnFocus';
import PropEditable from './examples/PropEditable';
import PropKeyboardType from './examples/PropKeyboardType';
import PropMaxLength from './examples/PropMaxLength';
import PropMultiline from './examples/PropMultiline';
import PropNumberOfLines from './examples/PropNumberOfLines';
import PropOnSelectionChange from './examples/PropOnSelectionChange';
import PropPlaceholder from './examples/PropPlaceholder';
import PropSecureTextEntry from './examples/PropSecureTextEntry';
import PropSelectTextOnFocus from './examples/PropSelectTextOnFocus';
import TextInputEvents from './examples/TextInputEvents';
import TextInputRewrite, { TextInputRewriteInvalidCharacters } from './examples/Rewrite';
import TouchableWrapper from './examples/TouchableWrapper';
import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
  StyleList,
  TextList
} from '../../ui-explorer';

const TextInputScreen = () => (
  <UIExplorer title="TextInput" url="1-components/TextInput">
    <Description>
      <AppText>
        Accessible single- and multi-line text input via a keyboard. Supports features such as
        auto-complete, auto-focus, placeholder text, and event callbacks. Note: some props are
        exclusive to or excluded from <Code>multiline</Code>.
      </AppText>
    </Description>

    <Section title="Props">
      <DocItem name="...View props" />

      <DocItem
        name="autoCapitalize"
        typeInfo="?enum('characters', 'none', 'sentences', 'words') = 'sentences'"
        description={[
          <AppText key={1}>
            Automatically capitalize certain characters (only available in Chrome and iOS Safari).
          </AppText>,
          <TextList
            key={2}
            items={[
              <AppText>
                <Code>characters</Code>: Automatically capitalize all characters.
              </AppText>,
              <AppText>
                <Code>none</Code>: Completely disables automatic capitalization.
              </AppText>,
              <AppText>
                <Code>sentences</Code>: Automatically capitalize the first letter of sentences.
              </AppText>,
              <AppText>
                <Code>words</Code>: Automatically capitalize the first letter of words.
              </AppText>
            ]}
          />
        ]}
        example={{
          render: () => <PropAutoCapitalize />
        }}
      />

      <DocItem
        label="web"
        name="autoComplete"
        typeInfo="?string"
        description={
          <AppText>
            Indicates whether the value of the control can be automatically completed by the
            browser.{' '}
            <AppText
              href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input"
              target="_blank"
            >
              Accepted values.
            </AppText>
          </AppText>
        }
      />

      <DocItem
        name="autoCorrect"
        typeInfo="?boolean = true"
        description="Automatically correct spelling mistakes (only available in iOS Safari)."
      />

      <DocItem
        name="autoFocus"
        typeInfo="?boolean = false"
        description="If `true`, focuses the input on `componentDidMount`. Only the first form element in a document with `autofocus` is focused."
      />

      <DocItem
        name="blurOnSubmit"
        typeInfo="?boolean"
        description={
          <AppText>
            If <Code>true</Code>, the text field will blur when submitted. The default value is{' '}
            <Code>true</Code> for single-line fields and <Code>false</Code> for multiline fields.
            Note, for multiline fields setting <Code>blurOnSubmit</Code> to <Code>true</Code> means
            that pressing return will blur the field and trigger the <Code>onSubmitEditing</Code>{' '}
            event instead of inserting a newline into the field.
          </AppText>
        }
        example={{
          render: () => <PropBlurOnSubmit />
        }}
      />

      <DocItem
        name="clearTextOnFocus"
        typeInfo="?boolean = false"
        description="If `true`, clears the text field automatically when focused."
        example={{
          render: () => <PropClearTextOnFocus />
        }}
      />

      <DocItem
        name="defaultValue"
        typeInfo="?string"
        description={
          <AppText>
            Provides an initial value that will change when the user starts typing. Useful for
            simple use-cases where you don't want to deal with listening to events and updating the{' '}
            <Code>value</Code> prop to keep the controlled state in sync.
          </AppText>
        }
      />

      <DocItem
        name="editable"
        typeInfo="?boolean = true"
        description="If `false`, text is not editable (i.e., read-only).  "
        example={{
          render: () => <PropEditable />
        }}
      />

      <DocItem
        name="keyboardType"
        typeInfo="enum('default', 'email-address', 'numeric', 'phone-pad', 'search', 'url', 'web-search') = 'default'"
        description="Determines which keyboard to open on devices with a virtual keyboard. Safari iOS requires an ancestral `<form action>` element to display the `search` keyboard). (Not available when `multiline` is `true`.)"
        example={{
          render: () => <PropKeyboardType />
        }}
      />

      <DocItem
        name="maxLength"
        typeInfo="?number"
        description="Limits the maximum number of characters that can be entered."
        example={{
          render: () => <PropMaxLength />
        }}
      />

      <DocItem
        name="multiline"
        typeInfo="?boolean = false"
        description="If true, the text input can be multiple lines."
        example={{
          render: () => <PropMultiline />
        }}
      />

      <DocItem
        name="numberOfLines"
        typeInfo="?number"
        description="Sets the number of lines for a multiline `TextInput`. (Requires `multiline` to be `true`.)"
        example={{
          render: () => <PropNumberOfLines />
        }}
      />

      <DocItem
        name="onBlur"
        typeInfo="?function"
        description="Callback that is called when the text input is blurred."
      />

      <DocItem
        name="onChange"
        typeInfo="?function"
        description="Callback that is called when the text input's text changes."
      />

      <DocItem
        name="onChangeText"
        typeInfo="?function"
        description="Callback that is called when the text input's text changes. The text is passed as an argument to the callback handler."
      />

      <DocItem
        name="onFocus"
        typeInfo="?function"
        description="Callback that is called when the text input is focused."
      />

      <DocItem
        name="onKeyPress"
        typeInfo="?function"
        description={
          <AppText>
            Callback that is called when a key is pressed. This will be called with{' '}
            <Code>{`{
nativeEvent: { key: keyValue } }`}</Code>{' '}
            where keyValue is <Code>Enter</Code> or <Code>Backspace</Code> for respective keys and
            the typed-in character otherwise including <Code>' '</Code>
            for space. Modifier keys (e.g., <Code>shiftKey</Code>) are also included in the{' '}
            <Code>nativeEvent</Code>. Fires before <Code>onChange</Code> callbacks.
          </AppText>
        }
      />

      <DocItem
        name="onLayout"
        typeInfo="?function"
        description="Invoked on mount and layout changes with {x, y, width, height}."
      />

      <DocItem
        name="onSelectionChange"
        typeInfo="?function"
        description={
          <AppText>
            Callback that is called when the text input's selection changes. This will be called
            with <Code>{'{ nativeEvent: { selection: { start, end } } }'}</Code>.
          </AppText>
        }
        example={{
          render: () => <PropOnSelectionChange />
        }}
      />

      <DocItem
        name="onSubmitEditing"
        typeInfo="?function"
        description="Callback that is called when the keyboard's submit button is pressed. When multiline={true}, this is only called if blurOnSubmit={true}."
      />

      <DocItem
        name="placeholder"
        typeInfo="?string"
        description="The string that will be rendered in an empty `TextInput` before text has been entered."
        example={{
          render: () => <PropPlaceholder />
        }}
      />

      <DocItem
        name="secureTextEntry"
        typeInfo="?boolean = false"
        description="If true, the text input obscures the text entered so that sensitive text like passwords stay secure. (Not available when `multiline` is `true`.)"
        example={{
          render: () => <PropSecureTextEntry />
        }}
      />

      <DocItem
        name="selection"
        typeInfo="?{ start: number, end: ?number }"
        description="The start and end of the text input's selection. Set start and end to the same value to position the cursor."
      />

      <DocItem
        name="selectTextOnFocus"
        typeInfo="?boolean = false"
        description="If `true`, all text will automatically be selected on focus."
        example={{
          render: () => <PropSelectTextOnFocus />
        }}
      />

      <DocItem
        name="style"
        typeInfo="?style"
        description={
          <StyleList
            stylePropTypes={[
              {
                name: '...Text#style'
              },
              {
                label: 'web',
                name: 'resize',
                typeInfo: 'string'
              }
            ]}
          />
        }
      />

      <DocItem
        name="value"
        typeInfo="?string"
        description={
          <AppText>
            The value to show for the text input. <Code>TextInput</Code> is a controlled component,
            which means the native <Code>value</Code> will be forced to match this prop if provided.
            Read about how{' '}
            <AppText
              children="React form components"
              href="https://facebook.github.io/react/docs/forms.html"
              target="_blank"
            />{' '}
            work. To prevent user edits to the value set <Code>{'editable={false}'}</Code>.
          </AppText>
        }
      />
    </Section>

    <Section title="Instance methods">
      <DocItem name="blur" typeInfo="() => void" description="Blur the underlying DOM input." />

      <DocItem
        name="clear"
        typeInfo="() => void"
        description="Clear the text from the underlying DOM input."
      />

      <DocItem name="focus" typeInfo="() => void" description="Focus the underlying DOM input." />

      <DocItem
        name="isFocused"
        typeInfo="() => boolean"
        description="Returns `true` if the input is currently focused; `false` otherwise."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="TextInput events"
        example={{
          render: () => <TextInputEvents />
        }}
      />

      <DocItem
        description="Rewrite (<sp> to '_' with maxLength)"
        example={{
          render: () => <TextInputRewrite />
        }}
      />

      <DocItem
        description="Rewrite (no spaces allowed)"
        example={{
          render: () => <TextInputRewriteInvalidCharacters />
        }}
      />

      <DocItem
        description="Wrapped in a TouchableWithoutFeedback"
        example={{
          render: () => <TouchableWrapper />
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('TextInput', TextInputScreen);

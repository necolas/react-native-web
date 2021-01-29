import React from 'react';
import { Text, View } from 'react-native';

const Heading = ({ children }) => (
  <Text
    accessibilityRole="heading"
    children={children}
    style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.5rem' }}
  />
);

const Spacer = () => <View style={{ height: '1.5rem' }} />;

function Color() {
  return (
    <View>
      <Heading>color</Heading>
      <Text style={{ color: 'red' }}>Red color</Text>
      <Text style={{ color: 'blue' }}>Blue color</Text>
    </View>
  );
}

function FontFamily() {
  return (
    <View>
      <Heading>fontFamily</Heading>
      <Text style={{ fontFamily: 'Cochin' }}>Cochin</Text>
      <Text
        style={{
          fontFamily: 'Cochin',
          fontWeight: 'bold'
        }}
      >
        Cochin bold
      </Text>
      <Text style={{ fontFamily: 'Helvetica' }}>Helvetica</Text>
      <Text style={{ fontFamily: 'Helvetica', fontWeight: 'bold' }}>Helvetica bold</Text>
      <Text style={{ fontFamily: 'Verdana' }}>Verdana</Text>
      <Text
        style={{
          fontFamily: 'Verdana',
          fontWeight: 'bold'
        }}
      >
        Verdana bold
      </Text>
    </View>
  );
}

function FontSize() {
  return (
    <View>
      <Heading>fontSize</Heading>
      <Text style={{ fontSize: 23 }}>Size 23</Text>
      <Text style={{ fontSize: 8 }}>Size 8</Text>
    </View>
  );
}

function FontStyle() {
  return (
    <View>
      <Heading>fontStyle</Heading>
      <Text style={{ fontStyle: 'normal' }}>Normal text</Text>
      <Text style={{ fontStyle: 'italic' }}>Italic text</Text>
    </View>
  );
}

function FontVariant() {
  return (
    <View>
      <Heading>fontVariant</Heading>
      <Text style={{ fontVariant: ['small-caps'] }}>Small Caps{'\n'}</Text>
      <Text
        style={{
          fontVariant: ['oldstyle-nums']
        }}
      >
        Old Style nums 0123456789{'\n'}
      </Text>
      <Text
        style={{
          fontVariant: ['lining-nums']
        }}
      >
        Lining nums 0123456789{'\n'}
      </Text>
      <Text style={{ fontVariant: ['tabular-nums'] }}>
        Tabular nums{'\n'}
        1111{'\n'}
        2222{'\n'}
      </Text>
      <Text style={{ fontVariant: ['proportional-nums'] }}>
        Proportional nums{'\n'}
        1111{'\n'}
        2222{'\n'}
      </Text>
    </View>
  );
}

function FontWeight() {
  return (
    <View>
      <Heading>fontWeight</Heading>
      <Text style={{ fontSize: 20, fontWeight: '100' }}>Move fast and be ultralight</Text>
      <Text style={{ fontSize: 20, fontWeight: '200' }}>Move fast and be light</Text>
      <Text style={{ fontSize: 20, fontWeight: 'normal' }}>Move fast and be normal</Text>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Move fast and be bold</Text>
      <Text style={{ fontSize: 20, fontWeight: '900' }}>Move fast and be ultrabold</Text>
    </View>
  );
}

function LetterSpacing() {
  return (
    <View>
      <Heading>letterSpacing</Heading>
      <Text style={{ letterSpacing: 0 }}>letterSpacing = 0</Text>
      <Text style={{ letterSpacing: 2, marginTop: 5 }}>letterSpacing = 2</Text>
      <Text style={{ letterSpacing: 9, marginTop: 5 }}>letterSpacing = 9</Text>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 12, letterSpacing: 2, backgroundColor: 'fuchsia', marginTop: 5 }}>
          With size and background color
        </Text>
      </View>
      <Text style={{ letterSpacing: -1, marginTop: 5 }}>letterSpacing = -1</Text>
      <Text style={{ letterSpacing: 3, backgroundColor: '#dddddd', marginTop: 5 }}>
        [letterSpacing = 3]
        <Text style={{ letterSpacing: 0, backgroundColor: '#bbbbbb' }}>
          [Nested letterSpacing = 0]
        </Text>
        <Text style={{ letterSpacing: 6, backgroundColor: '#eeeeee' }}>
          [Nested letterSpacing = 6]
        </Text>
      </Text>
    </View>
  );
}

function LineHeight() {
  return (
    <View>
      <Heading>lineHeight</Heading>
      <Text style={{ lineHeight: 35 }}>
        A lot of space should display between the lines of this long passage as they wrap across
        several lines. A lot of space should display between the lines of this long passage as they
        wrap across several lines.
      </Text>
    </View>
  );
}

function TextAlign() {
  return (
    <View>
      <Heading>textAlign</Heading>
      <Text>auto (default) - english LTR</Text>
      <Text>
        {'\u0623\u062D\u0628 \u0627\u0644\u0644\u063A\u0629 ' +
          '\u0627\u0644\u0639\u0631\u0628\u064A\u0629 auto (default) - arabic ' +
          'RTL'}
      </Text>
      <Text style={{ textAlign: 'left' }}>
        left left left left left left left left left left left left left left left
      </Text>
      <Text style={{ textAlign: 'center' }}>
        center center center center center center center center center center center
      </Text>
      <Text style={{ textAlign: 'right' }}>
        right right right right right right right right right right right right right
      </Text>
      <Text style={{ textAlign: 'justify' }}>
        justify: this text component{"'"}s contents are laid out with "textAlign: justify" and as
        you can see all of the lines except the last one span the available width of the parent
        container.
      </Text>
    </View>
  );
}

function TextDecoration() {
  return (
    <View>
      <Heading>textDecoration</Heading>
      <Text
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'solid'
        }}
      >
        Solid underline
      </Text>
      <Text
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'double',
          textDecorationColor: '#ff0000'
        }}
      >
        Double underline with custom color
      </Text>
      <Text
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'dashed',
          textDecorationColor: '#9CDC40'
        }}
      >
        Dashed underline with custom color
      </Text>
      <Text
        style={{
          textDecorationLine: 'underline',
          textDecorationStyle: 'dotted',
          textDecorationColor: 'blue'
        }}
      >
        Dotted underline with custom color
      </Text>
      <Text style={{ textDecorationLine: 'none' }}>None textDecoration</Text>
      <Text
        style={{
          textDecorationLine: 'line-through',
          textDecorationStyle: 'solid'
        }}
      >
        Solid line-through
      </Text>
      <Text
        style={{
          textDecorationLine: 'line-through',
          textDecorationStyle: 'double',
          textDecorationColor: '#ff0000'
        }}
      >
        Double line-through with custom color
      </Text>
      <Text
        style={{
          textDecorationLine: 'line-through',
          textDecorationStyle: 'dashed',
          textDecorationColor: '#9CDC40'
        }}
      >
        Dashed line-through with custom color
      </Text>
      <Text
        style={{
          textDecorationLine: 'line-through',
          textDecorationStyle: 'dotted',
          textDecorationColor: 'blue'
        }}
      >
        Dotted line-through with custom color
      </Text>
      <Text style={{ textDecorationLine: 'underline line-through' }}>
        Both underline and line-through
      </Text>
    </View>
  );
}

function TextShadow() {
  return (
    <View>
      <Heading>textShadow*</Heading>
      <Text
        style={{
          fontSize: 20,
          textShadowOffset: { width: 2, height: 2 },
          textShadowRadius: 1,
          textShadowColor: '#00cccc'
        }}
      >
        Text shadow example
      </Text>
    </View>
  );
}

export default function Style() {
  return (
    <View>
      <Color />
      <Spacer />

      <FontFamily />
      <Spacer />

      <FontSize />
      <Spacer />

      <FontStyle />
      <Spacer />

      <FontVariant />
      <Spacer />

      <FontWeight />
      <Spacer />

      <LetterSpacing />
      <Spacer />

      <LineHeight />
      <Spacer />

      <TextAlign />
      <Spacer />

      <TextDecoration />
      <Spacer />

      <TextShadow />
    </View>
  );
}

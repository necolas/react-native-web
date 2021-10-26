type CompiledStyle = {
  $$css: boolean,
  [key: string]: string,
};

type InlineStyle = {
  [key: string]: mixed,
};

type EitherStyle = CompiledStyle | InlineStyle;

type StylesArray<+T> = T | $ReadOnlyArray<StylesArray<T>>;
type Styles = StylesArray<CompiledStyle | InlineStyle | false>;
type Style<+T = EitherStyle> = StylesArray<false | ?T>;

type StyleqOptions = {
  disableCache?: boolean,
  disableMix?: boolean,
  transform?: (CompiledStyle) => CompiledStyle,
};

type StyleqResult = [string, InlineStyle | null];
type Styleq = (styles: Styles) => StyleqResult;

type IStyleq = {
  (...styles: $ReadOnlyArray<Styles>): StyleqResult,
  factory: (options?: StyleqOptions) => Styleq,
};

declare module "styleq" {
  declare module.exports: {
    styleq: IStyleq
  };
}

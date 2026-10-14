type CompiledStyle = {
  $$css: boolean,
  [key: string]: string,
};

type InlineStyle = {
  [key: string]: unknown,
};

type EitherStyle = CompiledStyle | InlineStyle;

type StylesArray<out T> = T | ReadonlyArray<StylesArray<T>>;
type Styles = StylesArray<EitherStyle | false | void>;
type Style<out T = EitherStyle> = StylesArray<false | ?T>;

type StyleqOptions = {
  disableCache?: boolean,
  disableMix?: boolean,
  transform?: (EitherStyle) => EitherStyle,
};

type StyleqResult = [string, InlineStyle | null];
type Styleq = (styles: Styles) => StyleqResult;

type IStyleq = {
  (...styles: ReadonlyArray<Styles>): StyleqResult,
  factory: (options?: StyleqOptions) => Styleq,
};

declare module "styleq" {
  declare module.exports: {
    styleq: IStyleq
  };
}

declare module "styleq/transform-localize-style" {
  declare module.exports: {
    localizeStyle: (style: EitherStyle, isRTL: boolean) => EitherStyle
  };
}

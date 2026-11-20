declare module 'styleq' {
  type CompiledStyle = {
    $$css: boolean | string;
    [key: string]: string | boolean;
  };

  type InlineStyle = Record<string, unknown>;

  type EitherStyle = CompiledStyle | InlineStyle;

  type StylesArray<T> = T | ReadonlyArray<StylesArray<T>>;
  type Styles = StylesArray<EitherStyle | false | '' | null | void>;

  type StyleqOptions = {
    disableCache?: boolean;
    disableMix?: boolean;
    transform?: (style: EitherStyle) => EitherStyle;
  };

  type StyleqResult = [string, InlineStyle | null, string];
  type Styleq = (styles: Styles) => StyleqResult;

  type IStyleq = {
    (...styles: ReadonlyArray<Styles>): StyleqResult;
    factory: (options?: StyleqOptions) => Styleq;
  };

  export const styleq: IStyleq;
}

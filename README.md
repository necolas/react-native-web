# Development monorepo

## Structure

* `.github`
  * Contains workflows used by GitHub Actions.
  * Contains issue templates.
* `configs`
  * Contains configration files used by the monorepo tooling (compiling, linting, testing, etc.)
* `packages`
  * [react-native-web](https://github.com/necolas/react-native-web/blob/master/packages/react-native-web)
  * Contains the individual packages managed in the monorepo.
* `scripts`
  * Contains Node.js scripts for miscellaneous tasks.

## Contributing

Development happens in the open on GitHub and we are grateful for contributions including bugfixes, improvements, and ideas.

### Code of conduct

This project expects all participants to adhere to Meta's OSS [Code of Conduct][code-of-conduct]. Please read the full text so that you can understand what actions will and will not be tolerated.

### Contributing guide

Read the [contributing guide][contributing-url] to learn about the development process, how to propose bugfixes and improvements, and how to build and test your changes to React Native for Web.

### Good first issues

To help you get you familiar with the contribution process, there is a list of [good first issues][good-first-issue-url] that contain bugs which have a relatively limited scope. This is a great place to get started.

[contributing-url]: https://github.com/necolas/react-native-web/blob/master/.github/CONTRIBUTING.md
[good-first-issue-url]: https://github.com/necolas/react-native-web/labels/good%20first%20issue
[code-of-conduct]: https://opensource.fb.com/code-of-conduct/

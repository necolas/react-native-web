# Contributing

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue tracker](https://github.com/necolas/react-native-web/issues) to make sure your issue hasn't already been reported. Please note that your issue may be closed if it doesn't include the information requested in the issue template.

## Getting started

Visit the [Issue tracker](https://github.com/necolas/react-native-web/issues) to find a list of open issues that need attention.

Fork, then clone the repo:

```
git clone https://github.com/your-username/react-native-web.git
```

Install dependencies (requires [yarn](https://yarnpkg.com/en/docs/install)):

```
yarn
```

## Automated tests

To run the linter:

```
yarn lint
```

To run flow:

```
yarn flow
```

To run the unit tests:

```
yarn jest
```

…in watch mode:

```
yarn jest --watch
```

To run all these automated tests:

```
yarn test
```

## Compile and build

To compile the `react-native-web` source code:

```
yarn compile
```

…in watch mode:

```
yarn compile --watch
```

## Documentation

To run the documentation website:

```
yarn docs:dev
```

## Examples

To run the examples app:

```
yarn examples:dev
```

When you're also making changes to the 'react-native-web' source files, run this command in another process:

```
yarn compile --watch
```

## Benchmarks

To run the benchmarks locally:

```
yarn benchmarks:dev
open ./packages/benchmarks/dist/index.html
```

To develop against these benchmarks:

```
yarn compile --watch
yarn benchmarks --watch
```

### New Features

Please open an issue with a proposal for a new feature or refactoring before starting on the work. We don't want you to waste your efforts on a pull request that we won't want to accept.

## Pull requests

**Before submitting a pull request**, please make sure the following is done:

1. Fork the repository and create your branch from `master`.
2. If you've added code that should be tested, add tests!
3. If you've changed APIs, update the documentation.
4. Ensure the tests pass (`yarn test`).

You should see a pre-commit hook run before each commit. If it does not, you may need to reset you Git hookspath:

```
git config --unset core.hookspath
```

You can now submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including unrelated commits.

After you have submitted your pull request, we'll try to get back to you as soon as possible. We may suggest some changes or improvements.

Thank you for contributing!

## Releases

To commit, publish, and push a final version:

```
yarn release <version>
```

Release candidates or versions that you'd like to publish to npm, but do not want to produce a commit and push it to GitHub:

```
yarn release <version> --skip-git
```

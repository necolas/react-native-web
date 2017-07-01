# Contributing

## Reporting Issues and Asking Questions

Before opening an issue, please search the [issue
tracker](https://github.com/necolas/react-native-web/issues) to make sure your
issue hasn't already been reported.

## Getting started

Visit the [Issue tracker](https://github.com/necolas/react-native-web/issues)
to find a list of open issues that need attention.

Fork, then clone the repo:

```
git clone https://github.com/your-username/react-native-web.git
```

Install dependencies (requires [yarn](https://yarnpkg.com/en/docs/install):

```
yarn
```

## Automated tests

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
yarn jest:watch
```

To run all automated tests:

```
yarn test
```

## Visual tests

To run the interactive storybook:

```
yarn docs:start
```

To generate a static build of the storybook:

```
yarn docs:build
```

To run the performance benchmarks in a browser (opening `./benchmarks/index.html`):

```
yarn benchmarks
```

## Compile and build

To compile the source code to `dist`:

```
yarn compile
```

To create a UMD bundle of the library:

```
yarn build
```

### Pre-commit

To format and lint code before commit:

```
yarn precommit
```

To format and lint the entire project:

```
yarn fmt
yarn lint
```

### New Features

Please open an issue with a proposal for a new feature or refactoring before
starting on the work. We don't want you to waste your efforts on a pull request
that we won't want to accept.

## Submitting Changes

* Open a new issue in the [Issue tracker](https://github.com/necolas/react-native-web/issues).
* Fork the repo.
* Create a new feature branch based off the `master` branch.
* Make sure all tests pass and there are no linting errors.
* Submit a pull request, referencing any issues it addresses.

Please try to keep your pull request focused in scope and avoid including
unrelated commits.

After you have submitted your pull request, we'll try to get back to you as
soon as possible. We may suggest some changes or improvements.

Thank you for contributing!

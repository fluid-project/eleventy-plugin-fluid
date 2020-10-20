# eleventy-plugin-fluid

[![License: BSD 3-Clause](https://badgen.net/github/license/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/blob/main/LICENSE.md)
[![Latest Release](https://badgen.net/github/release/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/releases/latest/)
[![NPM Package](https://badgen.net/npm/v/@fluid-project/eleventy-plugin-fluid)](http://npmjs.com/package/@fluid-project/eleventy-plugin-fluid)

Eleventy plugin which provides common filters, shortcodes and transforms for [Fluid Project](https://fluidproject.org) websites.

## Usage

### Filters

#### formatDate

Formats a date string.

```javascript
formatDate("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)");
```

Output: `June 21st, 2020`

#### isoDate

Formats a date string to [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) format.

```javascript
isoDate("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)");
```

Output: `2020-06-21T21:00:00.000Z`

#### limit

Trims an array to the specified length.

```javascript
limit(["a", "b", "c"], 2);
```

Output: `["a", "b"]`

#### markdown

Processes an input string using [Markdown](https://markdown-it.github.io).

```javascript
markdown("A paragraph with some _emphasis_.");
```

Output: `<p>A paragraph with some <em>emphasis</em>.</p>\n`

#### slug

Processes an input string by lowercasing it, replacing whitespace with hyphens, and stripping special characters to create a URL-safe version.

```javascript
slug("Here’s my title!");
```

Output: `heres-my-title`

### Shortcodes

Coming soon.

### Transforms

Coming soon.

## Development

### Releasing

This package uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), enforced with [commitlint](https://commitlint.js.org/). This facilitates releasing new versions of the package. To cut a release, run:

```bash
npm run release
```

This will tag an appropriate [semantic version](https://semver.org) based on the nature of the recent commits to the project and update [the changelog](CHANGELOG.md).

You will then need to publish the updated version to the [npm registry](http://npmjs.com). This requires an npm account with appropriate maintainer permissions. To publish the package, run:

```bash
npm publish
```

For more information on publishing to npm, see the [npm publish documentation](https://docs.npmjs.com/cli/publish).

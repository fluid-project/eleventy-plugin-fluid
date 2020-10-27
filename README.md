# eleventy-plugin-fluid

[![License: BSD 3-Clause](https://badgen.net/github/license/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/blob/main/LICENSE.md)
[![Latest Release](https://badgen.net/github/release/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/releases/latest/)
[![NPM Package](https://badgen.net/npm/v/@fluid-project/eleventy-plugin-fluid)](http://npmjs.com/package/@fluid-project/eleventy-plugin-fluid)

Eleventy plugin which provides common filters, shortcodes and transforms for [Fluid Project](https://fluidproject.org) websites.

## Filters

### formatDate

Formats a date string.

```javascript
formatDate("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)");
```

Output: `June 21st, 2020`

### isoDate

Formats a date string to [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString) format.

```javascript
isoDate("Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)");
```

Output: `2020-06-21T21:00:00.000Z`

### limit

Trims an array to the specified length.

```javascript
limit(["a", "b", "c"], 2);
```

Output: `["a", "b"]`

### markdown

Processes an input string using [Markdown](https://markdown-it.github.io).

```javascript
markdown("A paragraph with some _emphasis_.");
```

Output: `<p>A paragraph with some <em>emphasis</em>.</p>\n`

### slug

Processes an input string by lowercasing it, replacing whitespace with hyphens, and stripping special characters to create a URL-safe version.

```javascript
slug("Here’s my title!");
```

Output: `heres-my-title`

### split

Splits an input string into an array based on a provided delimiter.

```javascript
split(["a,b,c"], ",");
```

Output: `["a", "b", "c"]`

## Shortcodes

Coming soon.

## Transforms

Coming soon.

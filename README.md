# eleventy-plugin-fluid

[![License: BSD 3-Clause](https://badgen.net/github/license/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/blob/main/LICENSE.md)
[![Latest Release](https://badgen.net/github/release/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/releases/latest/)
[![NPM Package](https://badgen.net/npm/v/eleventy-plugin-fluid)](http://npmjs.com/package/eleventy-plugin-fluid)

Eleventy plugin which provides common filters, shortcodes and transforms for [Fluid Project](https://fluidproject.org) websites.

## Installation

Add `eleventy-plugin-fluid` to your Eleventy-based static site by running:

```bash
npx install-peerdeps eleventy-plugin-fluid
```

(You can also run `npm install --save eleventy-plugin-fluid`, but you'll then need to install the specified [`infusion`](https://www.npmjs.com/package/infusion)
peer dependency in your project as well; the [`install-peerdeps`](https://www.npmjs.com/package/install-peerdeps)
command handles both at the same time.)

Then, in your Eleventy configuration file (usually `.eleventy.js`), load the plugin as follows:

```js
const fluidPlugin = require("eleventy-plugin-fluid");

module.exports = function (config) {
    config.addPlugin(fluidPlugin);
};
```

## Usage

### Filters

All examples use the [Nunjucks](https://mozilla.github.io/nunjucks/) template language. Eleventy supports a number of
other template languages; see Eleventy's [documentation on filters](https://www.11ty.dev/docs/filters/) for usage with
different template languages.

#### formatDate

Formats a date string.

```nunjucks
{{ "Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)" | formatDate }}
```

Output: `June 21st, 2020`

Optionally, a [`locale` parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locale_identification_and_negotiation)
can be supplied to format a date in a locale other than English.

```nunjucks
{{ "Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)" | formatDate('fr') }}
```

Output: `21 juin 2020`

#### isoDate

Formats a date string to [ISO 8601](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
format.

```nunjucks
{{ "Sun Jun 21 2020 18:00:00 GMT-0300 (Atlantic Daylight Time)") | isoDate }}
```

Output: `2020-06-21T21:00:00.000Z`

#### limit

Trims an array to the specified length.

```nunjucks
{{ ["a", "b", "c"] | limit(2) | dump }}
```

Output: `["a", "b"]`

#### markdown

Processes an input string using [Markdown](https://markdown-it.github.io).

```nunjucks
{{ "A paragraph with some _emphasis_." | markdown | safe }}
```

Output: `<p>A paragraph with some <em>emphasis</em>.</p>\n`

#### slug (deprecated)

Processes an input string by lowercasing it, replacing whitespace with hyphens, and stripping special characters to
create a URL-safe version.

**NOTE: This filter is deprecated as of eleventy-plugin-fluid 1.0. Instead, use Eleventy's new `slugify` filter.**

#### split

Splits an input string into an array based on a provided delimiter.

```nunjucks
{{ "a,b,c" | split(",") | dump }}
```

Output: `["a", "b", "c"]`

### Shortcodes

All examples use the [Nunjucks](https://mozilla.github.io/nunjucks/) template language. Eleventy supports a number of
other template languages; see Eleventy's [documentation on shortcodes](https://www.11ty.dev/docs/shortcodes/) for usage with
different template languages.

### figure

Outputs a `<figure>` element with a `<figcaption>`. The first and second parameters in the opening tag of the shortcode
are the image URL and alternative text respectively. Caption content, which can use Markdown, goes in between the
opening and closing shortcode tags.

```nunjucks
{% figure "/assets/image.png", "A description of this image." %}
An illustration of something, found [here](https://example.com).
{% endfigure %}
```

Output:

```html
<figure>
    <img src="/assets/image.png" alt="A description of this image." />
    <figcaption>
        <p>An illustration of something, found <a href="https://example.com">here</a>.</p>
    </figcaption>
</figure>
```

### uioStyles

Outputs links to the required CSS assets for an instance of [Infusion User Interface Options][1].

```nunjucks
{% uioStyles %}
```

Result:

```html
<link href="/lib/infusion/src/framework/preferences/css/Enactors.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/PrefsEditor.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/SeparatedPanelPrefsEditor.css" rel="stylesheet">
```

### uioScripts

Outputs links to the required JavaScript assets for an instance of [Infusion User Interface Options][1].

```nunjucks
{% uioScripts %}
```

Result:

```html
<link rel="preload" href="/lib/infusion/infusion-uio.js" as="script" />
<script src="/lib/infusion/infusion-uio.js"></script>
```

### uioTemplate

Outputs the required HTML template markup for an instance of [Infusion User Interface Options][1]. This should used
directly after the opening `<body>` tag.

```nunjucks
{% uioTemplate %}
```

Result:

```html
<div class="flc-prefsEditor-separatedPanel fl-prefsEditor-separatedPanel">
  <div class="fl-panelBar fl-panelBar-smallScreen" id ="Editorspace">
    <span class="fl-prefsEditor-buttons">
    <button class="flc-slidingPanel-toggleButton fl-prefsEditor-showHide"> Show/Hide</button>
    <button class="flc-prefsEditor-reset fl-prefsEditor-reset"><span class="fl-icon-undo"></span> Reset</button>
    </span>
  </div>
  <div class="flc-slidingPanel-panel flc-prefsEditor-iframe"></div>
  <div class="fl-panelBar fl-panelBar-wideScreen">
  <span class="fl-prefsEditor-buttons">
    <button class="flc-slidingPanel-toggleButton fl-prefsEditor-showHide"> Show/Hide</button>
      <button class="flc-prefsEditor-reset fl-prefsEditor-reset"><span class="fl-icon-undo"></span> Reset</button>
  </span>
  </div>
</div>
```

If you want to use a custom integration of User Interface Options, you can insert the required markup directly into your
[base template](https://github.com/fluid-project/fluidic-11ty/blob/main/src/_includes/layouts/base.njk).

### uioInit

Outputs the required JavaScript to initialize an instance of [Infusion User Interface Options][1]. This should used
directly before the closing `</body>` tag.

```nunjucks
{% uioInit %}
```

Result:

```html
<script>
  fluid.uiOptions.multilingual(".flc-prefsEditor-separatedPanel", {
    "auxiliarySchema": {
        "terms": {
            "templatePrefix": "/lib/infusion/src/framework/preferences/html",
            "messagePrefix": "/lib/infusion/src/framework/preferences/messages"
        },
        "fluid.prefs.tableOfContents": {
            "enactor": {
                "tocTemplate": "/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
                "tocMessage": "/lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json",
                "ignoreForToC": {
                    "ignoreClass": ".flc-toc-ignore"
                }
            }
        }
    },
    "prefsEditorLoader": {
        "lazyLoad": true
    }
  });
</script>
```

Optionally, to support localization, you can pass in locale and direction arguments.

```nunjucks
{% uioInit "fa", "rtl" %}
```

Result:

```html
<script>
  fluid.uiOptions.multilingual(".flc-prefsEditor-separatedPanel", {
    "auxiliarySchema": {
        "terms": {
            "templatePrefix": "/lib/infusion/src/framework/preferences/html",
            "messagePrefix": "/lib/infusion/src/framework/preferences/messages"
        },
        "fluid.prefs.tableOfContents": {
            "enactor": {
                "tocTemplate": "/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
                "tocMessage": "/lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json",
                "ignoreForToC": {
                    "ignoreClass": ".flc-toc-ignore"
                }
            }
        }
    },
    "prefsEditorLoader": {
        "lazyLoad": true
    },
    "locale": "fa",
    "direction": "rtl"
  });
</script>
```

If you want to use a custom integration of User Interface Options, you can insert the required script tag directly into your
[base template](https://github.com/fluid-project/fluidic-11ty/blob/main/src/_includes/layouts/base.njk).

### Transforms

Coming soon.

## Passthrough Copy

By default, `eleventy-plugin-fluid` copies the [required assets](src/config/uio-assets.json) for an instance of
[Infusion User Interface Options][1] into the `lib/infusion` directory of the build directory.

[1]: https://docs.fluidproject.org/infusion/development/tutorial-userInterfaceOptions/UserInterfaceOptions.html

## Development

### Releasing

This package uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), enforced with
[commitlint](https://commitlint.js.org/). This facilitates releasing new versions of the package via [Release Please](https://github.com/googleapis/release-please).
To cut a release, merge the current [release pull request](https://github.com/google-github-actions/release-please-action#whats-a-release-pr).

This will tag an appropriate [semantic version](https://semver.org) based on the nature of the recent commits to the
project and update [the changelog](CHANGELOG.md).

You will then need to publish the updated version to the [npm registry](http://npmjs.com). This requires an npm account
with appropriate maintainer permissions. To publish the package, run:

```bash
npm publish
```

For more information on publishing to npm, see the [npm publish documentation](https://docs.npmjs.com/cli/publish).

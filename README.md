# eleventy-plugin-fluid

[![License: BSD 3-Clause](https://badgen.net/github/license/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/blob/main/LICENSE.md)
[![Latest Release](https://badgen.net/github/release/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/releases/latest/)
[![NPM Package](https://badgen.net/npm/v/eleventy-plugin-fluid)](http://npmjs.com/package/eleventy-plugin-fluid)
[![codecov](https://codecov.io/gh/fluid-project/eleventy-plugin-fluid/branch/main/graph/badge.svg?token=ZF3OHK4MUC)](https://codecov.io/gh/fluid-project/eleventy-plugin-fluid)

Eleventy plugin which provides common filters, shortcodes and transforms for [Fluid Project](https://fluidproject.org) websites.

## Requirements

- Node >= 20
- Eleventy >= 3.0.0-beta.1
- Infusion >= 4.7.1

## Installation

Add `eleventy-plugin-fluid` to your Eleventy-based static site by running:

```bash
npx install-peerdeps eleventy-plugin-fluid
```

(You can also run `npm install --save eleventy-plugin-fluid`, but you'll then need to install the specified [`infusion`](https://www.npmjs.com/package/infusion)
peer dependency in your project as well; the [`install-peerdeps`](https://www.npmjs.com/package/install-peerdeps)
command handles both at the same time.)

Then, in your Eleventy configuration file (usually `eleventy.eleventyConfig.js`), load the plugin as follows:

```js
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
    eleventyConfig.addPlugin(fluidPlugin);
};
```

## Usage

For any options passed to `eleventy-plugin-fluid` in the configurations described below, you can override the default
rather than merging with it by passing the option with `override:` as a prefix to the key. For example, to override the
default options for the `css` configuration block, you could do the following:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        "override:css": {
+              // Your options here.
+        }
+    });
};
```

Note that if you don't override required defaults when using this method, your configuration will not be valid, so
proceed with caution if you are using this technique.

### Asset Handling

`eleventy-plugin-fluid` includes configuration for processing and bundling CSS files using [LightningCSS](https://lightningcss.dev/),
and JavaScript files using [esbuild](https://esbuild.github.io).

#### CSS

By default, any CSS files found in the `./src/assets/styles/` directory or its children will be processed _unless the
filename begins with an underscore (`_`)_. For this reason, if you are using CSS partials via the [`@import`](https://lightningcss.dev/bundling.html#%40import)
rule, you should name them according to the pattern `_partial.css` to prevent them from being transformed as standalone
files (this convention will be familiar to those who have worked with Sass and Sass partials).

Options for LightningCSS may be modified by passing values to the `css` option when registering `eleventy-plugin-fluid`
in your config:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        css: {
+              cssModules: true,
+        }
+    });
};
```

Default values are as follows:

```js
let options = {
    /* Where should Eleventy look for CSS files to process? */
    basePath: `./${eleventyConfig.dir.input || "src"}/assets/styles`,
    /* Should CSS files be processed? */
    enabled: true,
    /* See: https://lightningcss.dev/minification.html */
    minify: true,
    /* Not yet supported, see https://github.com/fluid-project/eleventy-plugin-fluid/issues/170 */
    sourceMap: false,
    /* See: https://lightningcss.dev/transpilation.html#draft-syntax */
    drafts: {
        nesting: true
    },
    /* A Browserslist configuration string (see: https://browsersl.ist) */
    browserslist: "> 1%"
};
```

If you wish to disable CSS processing altogether, set the `enabled` key of the `options.css` object to `false`.

If you wish to disable Browserslist altogether, you can pass an empty array (`[]`) to the `browserslist` key.

For more options, see the [LightningCSS docs](https://lightningcss.dev/docs.html).

#### JavaScript

By default, any JavaScript files with the `.js` extension found in the `./src/assets/scripts/` directory or its children
will be processed with [esbuild](https://esbuild.github.io) _unless the filename begins with an underscore (`_`)_.

Options for esbuild may be modified by passing values to the `js` option when registering `eleventy-plugin-fluid`
in your config:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        js: {
+            target: "esnext"
+        }
+    });
};
```

Default values are as follows:

```js
let options = {
    /* Where should Eleventy look for JavaScript files to process? */
    basePath: `./${eleventyConfig.dir.input || "src"}/assets/scripts`,
    /* Should JavaScript files be processed? */
    enabled: true,
    /* See: https://esbuild.github.io/api/#minify */
    minify: true,
    /* See: https://esbuild.github.io/content-types/#javascript */
    target: "es2020",
    basePath: `./${eleventyConfig.dir.output || "_site"}/assets/styles`
};
```

If you wish to disable JavaScript processing altogether, set the `enabled` key of the `options.js` object to `false`.

### Localization

`eleventy-plugin-fluid` adds support for localization using Eleventy's [i18n plugin](https://11ty.dev/docs/plugins/i18n/)
and [`rosetta`](https://npmjs.com/package/rosetta) for string translation.

By default, the following languages are configured:

- `en`
- `en-CA`
- `en-US`
- `es`
- `fa`
- `fr`
- `pt-br`

You can add support for additional languages by passing values to the `supportedLanguages` option when registering
`eleventy-plugin-fluid` in your config:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        supportedLanguages: {
+            de: {
+                // The slug which will be used in URLs to content in this language.
+                slug: "de",
+                // The slug which will be used to localize UIO (see: https://docs.fluidproject.org/infusion/development/localizationinthepreferencesframework#specifying-a-localization)
+                uioSlug: "de",
+                // The direction of the language.
+                dir: "ltr",
+                // The endonym of the language.
+                name: "Deutsch"
+            }
+        }
+    });
};
```

`eleventy-plugin-fluid` provides the following [global data](https://www.11ty.dev/docs/data-global-custom/):

```json
{
  "defaultLanguage": "en",
  "defaultLanguageDir": "ltr",
  "supportedLanguages": {
      "en": {
          "slug": "en",
          "uioSlug": "en",
          "dir": "ltr",
          "name": "English"
      },
      "en-CA": {
          "slug": "en-ca",
          "uioSlug": "en_CA",
          "dir": "ltr",
          "name": "English (Canada)"
      },
      "en-US": {
          "slug": "en-us",
          "uioSlug": "en_US",
          "dir": "ltr",
          "name": "English (United States)"
      },
      "es": {
          "slug": "es",
          "uioSlug": "es",
          "dir": "ltr",
          "name": "Español"
      },
      "fa": {
          "slug": "fa",
          "uioSlug": "fa",
          "dir": "rtl",
          "name": "فارسی"
      },
      "fr": {
          "slug": "fr",
          "uioSlug": "fr",
          "dir": "ltr",
          "name": "Français"
      },
      "pt-BR": {
          "slug": "pt-br",
          "uioSlug": "pt_BR",
          "dir": "ltr",
          "name": "Português (Brasil)"
      }
  }
}
```

The `defaultLanguage` can be overridden by passing a new value to the `defaultLanguage` options key when registering
`eleventy-plugin-fluid`.

#### Required Data

The localization shortcodes included in `eleventy-plugin-fluid` require a [global data object](https://www.11ty.dev/docs/data-global/)
called `translations` with the following shape:

```json
{
    "en": {
        "hello": "Hello {{name}}!"
    },
    "fr": {
        "hello": "Bonjour {{name}} !"
    }
}
```

All content—collections or individual pages—must have a front matter `lang` value corresponding to a configured
language. If one is not provided, it will be assumed to equal the `defaultLanguage`.

#### Helper Functions

`eleventy-plugin-fluid` also provides four localization-related helpers:

##### `__`

[`__`](src/utils/translation.js#L21) is used to translate a string, substituting values for placeholders where
required. For example:

```js
import { __ } from "eleventy-plugin-fluid";

console.log(__(
    "hello",
    {
        "name": "world"
    },
    {
        "locale": "fr",
        "translations": {
            "en": {
                "hello": "Hello {{name}}!"
            },
            "fr": {
                "hello": "Bonjour {{name}} !"
            }
        }
    }
));
```

Result: `Bonjour world !`

The first parameter is the key for the translation string in the `translations` object, the second parameter is an
object of values to substitute for placeholders in the translation string, and the third parameter is the data object
containing the `locale` and `translations` values. If the third parameter is not provided, the function will try to
retrieve these values from `this.ctx` which provides access to Eleventy's global data.

`eleventy-plugin-fluid` also provides a [shortcode](https://www.11ty.dev/docs/shortcodes/) based on this function:

<details>
<summary>Nunjucks</summary>

```nunjucks
{% __ 'hello', {name: 'world'} %}
```

</details>

<details>
<summary>11ty.js</summary>

```js
module.exports = function ({ key, values }) {
    return this.__(key, values);
};
```

</details>

**Note:** Using this function with Liquid requires extra work as Liquid shortcodes cannot accept a JSON object directly.

##### `_n`

[`_n`](src/utils/translation.js#L39) is used to translate a string with a numerical value, supporting singular or plural
forms depending on the value. For example:

```js
import { _n } from "eleventy-plugin-fluid";

console.log(_n(
    "posts_singular",
    "posts_plural",
    {
        "n": 3
    },
    {
        "locale": "fr",
        "translations": {
            "en": {
                "posts_singular": "{{n}} post",
                "posts_plural": "{{n}} posts"
            },
            "fr": {
                "posts_singular": "{{n}} article",
                "posts_plural": "{{n}} articles"
            }
        }
    }
));
```

Result: `3 articles`

The first parameter is the key for the translation string with a singular value in the `translations` object, the second
parameter is the key for the translation string with a plural value in the `translations` object, the third parameter is
the object of values to substitute for placeholders in the translation string (which must at minimum contain the key `n`
for the numeric value), and the fourth parameter is the data object containing the `lang` and `translations` values.
If the fourth parameter is not provided, the function will try to retrieve these values from `this.ctx` which provides
access to Eleventy's global data.

`eleventy-plugin-fluid` also provides a [shortcode](https://www.11ty.dev/docs/shortcodes/) based on this function:

<details>
<summary>Nunjucks</summary>

```nunjucks
{% _n 'posts_singular', 'posts_plural', {n: count} %}
```

</details>

<details>
<summary>11ty.js</summary>

```js
module.exports = function ({ singular, plural, values }) {
    return this._n(singular, plural, values);
};
```

</details>

**Note:** Using this function with Liquid requires extra work as Liquid shortcodes cannot accept a JSON object directly.

##### `generatePermalink`

[`generatePermalink`](src/utils/generate-permalink.js) is used to generate localized permalinks for a collection type,
with full support for [pagination](https://www.11ty.dev/docs/pagination/). Here's an example, as used in an `11tydata.js`
file:

```js
import { EleventyI18nPlugin } from "@11ty/eleventy";
import { generatePermalink, __ } from "eleventy-plugin-fluid";

export default {
    layout: "layouts/base.njk",
    eleventyComputed: {
        lang: data => EleventyI18nPlugin.LangUtils.getLanguageCodeFromInputPath(data.page.inputPath),
        langDir: data => data.supportedLanguages[data.lang].dir,
        locale: data => data.lang,
        permalink: data => {
            // Only localize the permalink if the locale and translations global data are present.
            if (data.hasOwnProperty("locale") && data.hasOwnProperty("translations")) {
                return generatePermalink(data, "pages", __("pages", {}, data), __("pages", {}, data));
            }

            return generatePermalink(data, "pages", "pages", "pages");
        }
    }
};
```

In this example, the [`__`](src/utils/translation.js#L21) function is used
to localize the URL path for the collection.

#### Disabling String Translation

If you don't need string translation features in your project, you can disable string translation by setting the `i18n`
option to false when registering `eleventy-plugin-fluid` in your config:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        i18n: false
+    });
};
```

Note that if you do this, you will need to remove any uses of the `__` or `_n` helpers in your project.

#### Additional Reference

For additional information on setting up localization/internationalization, see:

- [Eleventy Internationalization plugin](https://www.11ty.dev/docs/plugins/i18n/)
- [Trivet](https://github.com/fluid-project/trivet/#internationalization)

### Markdown Configuration

`eleventy-plugin-fluid` amends Eleventy's [default Markdown configuration](https://www.11ty.dev/docs/languages/markdown/#default-options)
as follows (for more information see [markdown-it](https://github.com/markdown-it/markdown-it#init-with-presets-and-options)):

```json
{
    "html": true,
    "linkify": true,
    "typographer": true
}
```

Options for Markdown may be modified by passing values to the `markdown` option when registering `eleventy-plugin-fluid`
in your config:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        markdown: {
+            options: {
+                breaks: "true"
+            }
+        }
+    });
};
```

You can also enable [`markdown-it` plugins](https://www.npmjs.com/search?q=keywords:markdown-it-plugin) when
registering `eleventy-plugin-fluid` as follows:

```diff
import fluidPlugin from "eleventy-plugin-fluid";
+ import markdownItDefList from "markdown-it-deflist";
+ import markdownItEmoji from "markdown-it-emoji";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        markdown: {
+            plugins: [
+                // The imported plugin.
+                markdownItDefList,
+                // The imported plugin and an options object for the plugin.
+                [markdownItEmoji, {}]
+            ]
+        }
+    });
};
```

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

Processes an input string using [Markdown](https://www.11ty.dev/docs/languages/markdown/).

```nunjucks
{{ "A paragraph with some _emphasis_." | markdown | safe }}
```

Output: `<p>A paragraph with some <em>emphasis</em>.</p>\n`

#### slug (deprecated)

Processes an input string by lowercasing it, replacing whitespace with hyphens, and stripping special characters to
create a URL-safe version.

**NOTE: This filter has been completely removed as of eleventy-plugin-fluid 3.0.
Instead, use Eleventy's [`slugify`](https://www.11ty.dev/docs/filters/slugify/) filter.**

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

#### figure

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

#### uioStyles

Outputs links to the required CSS assets for an instance of [Infusion User Interface Options][1]. Use this when you want
the out-of-the-box/drop-in experience with UI Options styles overriding the site styles. This is the quickest way to
start, but harder to customize and fit with your site's own styling.

```nunjucks
{% uioStyles %}
```

Result:

```html
<link href="/lib/infusion/src/framework/core/css/fluid.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/Enactors.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/PrefsEditor.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/SeparatedPanelPrefsEditor.css" rel="stylesheet">
```

#### uioStyleProps

Outputs links to the required CSS assets for an instance of [Infusion User Interface Options][1]. This only includes the
related CSS Custom Properties. Use this when you want to have control over how the enactor styles are applied.

See: [Integrating UI Options Styling Preferences](https://docs.fluidproject.org/infusion/development/tutorial-userinterfaceoptions/integratinguioptionsstylingpreferences)

```nunjucks
{% uioStyleProps %}
```

Result:

```html
<link href="/lib/infusion/src/framework/core/css/fluid.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/Contrast_base.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/EnhanceInputs_base.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/Font_base.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/PrefsEditor.css" rel="stylesheet">
<link href="/lib/infusion/src/framework/preferences/css/SeparatedPanelPrefsEditor.css" rel="stylesheet">
```

#### uioScripts

Outputs links to the required JavaScript assets for an instance of [Infusion User Interface Options][1].

```nunjucks
{% uioScripts %}
```

Result:

```html
<link rel="preload" href="/lib/infusion/infusion-uio.js" as="script" />
<script src="/lib/infusion/infusion-uio.js"></script>
```

#### uioTemplate

Outputs the required HTML template markup for an instance of [Infusion User Interface Options][1]. This should used
directly after the opening `<body>` tag.

```nunjucks
{% uioTemplate %}
```

Result:

```html
<div class="flc-prefsEditor-separatedPanel fl-prefsEditor-separatedPanel">
    <div class="fl-panelBar fl-panelBar-smallScreen" id="Editorspace">
        <span class="fl-prefsEditor-buttons">
            <button class="flc-slidingPanel-toggleButton fl-prefsEditor-showHide"> Show/Hide</button>
            <button class="flc-prefsEditor-reset fl-prefsEditor-reset"><span class="fl-icon-undo"></span> Reset</button>
        </span>
    </div>
    <div class="flc-slidingPanel-panel"></div>
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

#### uioInit

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

### Template Languages

#### WebC

`eleventy-plugin-fluid` adds the [Eleventy WebC plugin](https://www.11ty.dev/docs/languages/webc/) for WebC support. By
default, the plugin will look for WebC components in `./src/_components/**/*.webc`. This, and [other options](https://www.11ty.dev/docs/languages/webc/#installation),
can be modified when registering `eleventy-plugin-fluid`:

```diff
import fluidPlugin from "eleventy-plugin-fluid";

export default function (eleventyConfig) {
-    eleventyConfig.addPlugin(fluidPlugin);
+    eleventyConfig.addPlugin(fluidPlugin, {
+        webc: {
+            components: "./src/_includes/**/*.webc"
+        }
+    });
};
```

### Transforms

#### HTML Minify

`eleventy-plugin-fluid` adds an HTML minify transform to output files with a `.html` extension which minifies them
using [`html-minifier`](https://www.npmjs.com/package/html-minifier).

## Passthrough Copy

By default, `eleventy-plugin-fluid` copies the [required assets](src/config/uio-assets.json) for an instance of
[Infusion User Interface Options][1] into the `lib/infusion` directory of the build directory.

[1]: https://docs.fluidproject.org/infusion/development/tutorial-userInterfaceOptions/UserInterfaceOptions.html

## Upgrade Guide

### v2.x to v3.x

- **BREAKING:** `eleventy-plugin-fluid` v3.x requires Eleventy v3.x and is written in ESM. See [this post](https://www.11ty.dev/blog/canary-eleventy-v3/#new-features-and-a-short-upgrade-guide)
  for upgrade information and guidance.
- **BREAKING:** The [`markdown` filter](https://github.com/fluid-project/eleventy-plugin-fluid/tree/v2.7.3?tab=readme-ov-file#markdown)
  has been removed. Please use the Eleventy Render plugin's [`renderContent` filter](https://github.com/11ty/eleventy/issues/3370)
  instead.

  ```diff
  {% set string = "**Hi!** %}
  - {{ string | markdown | safe }}
  + {{ string | renderContent('md') | safe }}
  ```

- **BREAKING:** The [`renderString` shortcode](https://github.com/fluid-project/eleventy-plugin-fluid/tree/v2.7.3?tab=readme-ov-file#renderstring)
  has been removed. Please use the Eleventy Render plugin's [`renderContent` filter](https://github.com/11ty/eleventy/issues/3370)
  instead:

  ```diff
  {% set string = "**Hi!** %}
  - {% renderString string, 'md' %}
  + {{ string | renderContent('md') | safe }}
  ```

- **BREAKING:** The [Eleventy WebC plugin](https://www.11ty.dev/docs/languages/webc/) is no longer included. If your
  project uses WebC, please follow the [installation instructions](https://www.11ty.dev/docs/languages/webc/#installation)
  to add the plugin.

- **BREAKING:** Sass support is no longer included. If your project uses Sass, please install [`eleventy-plugin-fluid-sass`](https://npmjs.com/packages/eleventy-plugin-fluid-sass).

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

## Third Party Software in `eleventy-plugin-fluid`

`eleventy-plugin-fluid` is based on other publicly available software, categorized by license:

### ISC License

- [eleventy-plugin-lightningcss](https://github.com/5t3ph/eleventy-plugin-lightningcss)

### MIT License

- [deepMerge.js](https://vanillajstoolkit.com/helpers/deepmerge/)

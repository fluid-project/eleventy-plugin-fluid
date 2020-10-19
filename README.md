# eleventy-plugin-fluid

[![License](https://badgen.net/github/license/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/blob/main/LICENSE.md)
[![Latest Release](https://badgen.net/github/release/fluid-project/eleventy-plugin-fluid/)](https://github.com/fluid-project/eleventy-plugin-fluid/releases/latest/)
![NPM](https://badgen.net/npm/v/@fluid-project/eleventy-plugin-fluid)

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

## Shortcodes

### uioStyles

Outputs links to the required CSS assets for an instance of [Infusion User Interface Options][1].

```liquid
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

```liquid
{% uioScripts %}
```

Result:

```html
<link rel="preload" href="/lib/infusion/infusion-uio.min.js" as="script" />
<script src="/lib/infusion/infusion-uio.min.js"></script>
```

### uioTemplate

Outputs the required HTML template markup for an instance of [Infusion User Interface Options][1]. This should used directly after the opening `<body>` tag.

```liquid
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

### uioInit

Outputs the required JavaScript to initialize an instance of [Infusion User Interface Options][1]. This should used directly before the closing `</body>` tag.

```liquid
{% uioInit %}
```

Result:

```html
<script>
  fluid.uiOptions.prefsEditor(".flc-prefsEditor-separatedPanel", {
    terms: {
      "templatePrefix": "/lib/infusion/src/framework/preferences/html",
      "messagePrefix": "/lib/infusion/src/framework/preferences/messages"
    },
    "tocTemplate": "/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
    "tocMessage": "/lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json"
  });
</script>
```

## Transforms

Coming soon.

## Passthrough Copy

By default, `eleventy-plugin-fluid` copies the [required assets](src/config/uio-assets.json) for an instance of [Infusion User Interface Options][1] into the `lib/infusion` directory of the build directory.

[1]: https://docs.fluidproject.org/infusion/development/tutorial-userInterfaceOptions/UserInterfaceOptions.html

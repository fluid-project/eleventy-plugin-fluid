/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

module.exports = {
    uioStyles: function () {
        return `<link href="/lib/infusion/src/framework/preferences/css/Enactors.css" rel="stylesheet">
    <link href="/lib/infusion/src/framework/preferences/css/PrefsEditor.css" rel="stylesheet">
    <link href="/lib/infusion/src/framework/preferences/css/SeparatedPanelPrefsEditor.css" rel="stylesheet">`;
    },
    uioScripts: function () {
	      return `<link rel="preload" href="/lib/infusion/infusion-uio.min.js" as="script" />
    <script src="/lib/infusion/infusion-uio.min.js"></script>`;
    },
    uioTemplate: function () {
        return `<div class="flc-prefsEditor-separatedPanel fl-prefsEditor-separatedPanel">
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
  </div>`;
    },
    uioInit: function () {
        return `<script>
            fluid.uiOptions(".flc-prefsEditor-separatedPanel", {
                auxiliarySchema: {
                    terms: {
                        "templatePrefix": "/lib/infusion/src/framework/preferences/html",
                        "messagePrefix": "/lib/infusion/src/framework/preferences/messages"
                    },
                    "fluid.prefs.tableOfContents": {
                        enactor: {
                            "tocTemplate": "/lib/infusion/src/components/tableOfContents/html/TableOfContents.html",
                            "tocMessage": "/lib/infusion/src/framework/preferences/messages/tableOfContents-enactor.json",
                            ignoreForToC: {}
                        }
                    }
                },
                prefsEditorLoader: {
                    lazyLoad: true
                }
            });
        </script>`;
    }
};

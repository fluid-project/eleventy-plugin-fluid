/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import fs from "node:fs";
import test from "ava";
import Eleventy from "@11ty/eleventy";

test.before(async function () {
    let elev = new Eleventy();
    await elev.write();
});

test("Builds minified CSS from CSS", async function (t) {
    let mainCss = fs.readFileSync("_site/assets/styles/app.css", "utf8");
    let timelineCss = fs.readFileSync("_site/assets/styles/pages/timeline.css", "utf8");
    t.is(mainCss, "*{box-sizing:border-box}button{font-family:inherit;font-size:1rem}*+*{margin-top:var(--space,1em)}");
    t.is(timelineCss, ".timeline ul{padding-inline-start:0;list-style:none}");
});

test("Builds minified CSS from Sass", async function (t) {
    let sassCss = fs.readFileSync("_site/assets/styles/sass.css", "utf8");
    t.is(sassCss, "a{color:#600}mark{background-color:#f90}");
});

test("Builds minified JavaScript", async function (t) {
    let appJs = fs.readFileSync("_site/assets/scripts/app.js", "utf8");
    let nojsJs = fs.readFileSync("_site/assets/scripts/no-js.js", "utf8");
    t.is(appJs, "(()=>{var l=function(e){let t=new Intl.PluralRules(\"en\",{type:\"ordinal\"}),n=new Map([[\"one\",\"st\"],[\"two\",\"nd\"],[\"few\",\"rd\"],[\"other\",\"th\"]]),r=t.select(e),o=n.get(r);return`${e}${o}`};function a(e,t=\"en\"){let n=new Date(new Date(e).toUTCString()),r={year:\"numeric\",month:\"long\",day:\"numeric\"};if(t.startsWith(\"en\")){let o=n.toLocaleDateString(t,r),s=/([A-Z]\\w+) ([0-9]{1,2}), ([0-9]{4})/g;return o.replace(s,(d,c,f,u)=>`${c} ${l(f)}, ${u}`)}return n.toLocaleDateString(t,r)}var i=a;var D={year:i(Date.now())};})();\n");
    t.is(nojsJs, "(()=>{document.documentElement.className=\"js\";})();\n");
});

test("Uses Markdown plugin", async  function (t) {
    let indexPage = fs.readFileSync("_site/index.html", "utf8");
    t.true(indexPage.includes("<dl><dt>Term 1</dt><dd>Definition 1</dd></dl>"))
})

test("Uses Markdown plugin with options", async  function (t) {
    let indexPage = fs.readFileSync("_site/index.html", "utf8");
    t.true(indexPage.includes("<h2 id=\"this-should-have-an-anchor\" tabindex=\"-1\"><a class=\"header-anchor\" href=\"#this-should-have-an-anchor\"><span>This should have an anchor</span></a></h2>"));
})

test("Generates English permalinks", async function (t) {
    let englishPost = fs.readFileSync("_site/posts/introduction/index.html", "utf8");
    t.true(englishPost.includes("<h1>Introduction</h1>"));

    let english404 = fs.readFileSync("_site/404.html", "utf8");
    t.true(english404.includes("<h1>Page Not Found</h1>"));
});

test("Generates permalinks from a custom slug", async function (t) {
    let tlaPage = fs.readFileSync("_site/tla/index.html", "utf8");
    t.true(tlaPage.includes("<h1>Three Letter Acronym</h1>"));
});

test("Generates French permalinks", async function (t) {
    let frPost = fs.readFileSync("_site/fr/posts/introduction/index.html", "utf8");
    t.true(frPost.includes("<h1>Introduction</h1>"));

    let fr404 = fs.readFileSync("_site/fr/404.html", "utf8");
    t.true(fr404.includes("<h1>Page non trouvée</h1>"));
});

test("Generates user-configured language permalinks", async function (t) {
    let dePost = fs.readFileSync("_site/de/posts/einfuehrung/index.html", "utf8");
    t.true(dePost.includes("<h1>Einführung</h1>"));
});

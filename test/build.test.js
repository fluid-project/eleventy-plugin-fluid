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

test("Builds minified CSS", async function (t) {
    let mainCss = fs.readFileSync("_site/assets/styles/app.css", "utf8");
    let timelineCss = fs.readFileSync("_site/assets/styles/pages/timeline.css", "utf8");
    t.is(mainCss, "*{box-sizing:border-box}button{font-family:inherit;font-size:1rem}*+*{margin-top:var(--space,1em)}");
    t.is(timelineCss, ".timeline ul{padding-inline-start:0;list-style:none}");
});

test("Builds minified JavaScript", async function (t) {
    let appJs = fs.readFileSync("_site/assets/scripts/app.js", "utf8");
    let nojsJs = fs.readFileSync("_site/assets/scripts/no-js.js", "utf8");
    t.is(appJs, "(()=>{var l=function(e){let t=new Intl.PluralRules(\"en\",{type:\"ordinal\"}),r=new Map([[\"one\",\"st\"],[\"two\",\"nd\"],[\"few\",\"rd\"],[\"other\",\"th\"]]),n=t.select(e),o=r.get(n);return\`${e}${o}\`};function a(e,t=\"en\"){let r=new Date(new Date(e).toUTCString()),n={year:\"numeric\",month:\"long\",day:\"numeric\"};if(t.startsWith(\"en\")){let o=r.toLocaleDateString(t,n),i=/([A-Z]\\w+) ([0-9]{1,2}), ([0-9]{4})/g;return o.replace(i,(d,s,f,u)=>\`${s} ${l(f)}, ${u}\`)}return r.toLocaleDateString(t,n)}var c=a;var x={year:c(Date.now())};})();\n");
    t.is(nojsJs, "(()=>{document.documentElement.className=\"js\";})();\n");
});

test("Uses Markdown plugin", async  function (t) {
    let indexPage = fs.readFileSync("_site/index.html", "utf8");
    t.true(indexPage.includes("<dl><dt>Widdershins</dt><dd>Counter-clockwise.</dd></dl>"));
});

test("Uses Markdown plugin with options", async  function (t) {
    let indexPage = fs.readFileSync("_site/index.html", "utf8");
    t.true(indexPage.includes("<h2 id=\"definitions\" tabindex=\"-1\"><a class=\"header-anchor\" href=\"#definitions\"><span>Definitions</span></a></h2>"));
});

test("Translates strings with placeholders", async  function (t) {
    let englishIndexPage = fs.readFileSync("_site/index.html", "utf8");
    t.true(englishIndexPage.includes("Hello Alice!"));

    let frenchIndexPage = fs.readFileSync("_site/fr/index.html", "utf8");
    t.true(frenchIndexPage.includes("Bonjour Alice !"));
});

test("Translates singular/plural strings with placeholders", async  function (t) {
    let englishIndexPage = fs.readFileSync("_site/index.html", "utf8");
    t.true(englishIndexPage.includes("6 posts"));

    let frenchIndexPage = fs.readFileSync("_site/fr/index.html", "utf8");
    t.true(frenchIndexPage.includes("6 articles"));
});

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
    let frPost = fs.readFileSync("_site/fr/articles/introduction/index.html", "utf8");
    t.true(frPost.includes("<h1>Introduction</h1>"));

    let fr404 = fs.readFileSync("_site/fr/404.html", "utf8");
    t.true(fr404.includes("<h1>Page non trouvée</h1>"));
});

test("Generates user-configured language permalinks", async function (t) {
    let dePost = fs.readFileSync("_site/de/artikel/einfuehrung/index.html", "utf8");
    t.true(dePost.includes("<h1>Einführung</h1>"));
});

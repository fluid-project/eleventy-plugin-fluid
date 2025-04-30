/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/

import assert from "node:assert";
import { beforeEach, test } from "node:test";
import fs from "node:fs";
import Eleventy from "@11ty/eleventy";

beforeEach(async () => {
    let elev = new Eleventy();
    await elev.write();
});

test("Builds minified CSS", async () => {
    let mainCss = fs.readFileSync("_site/assets/styles/app.css", "utf8");
    let timelineCss = fs.readFileSync("_site/assets/styles/pages/timeline.css", "utf8");
    assert.strictEqual(mainCss, "*{box-sizing:border-box}button{font-family:inherit;font-size:1rem}*+*{margin-top:var(--space,1em)}");
    assert.strictEqual(timelineCss, ".timeline ul{padding-inline-start:0;list-style:none}");
});

test("Builds minified JavaScript", async () => {
    let appJs = fs.readFileSync("_site/assets/scripts/app.js", "utf8");
    let nojsJs = fs.readFileSync("_site/assets/scripts/no-js.js", "utf8");
    assert.strictEqual(appJs, "(()=>{var l=function(e){let t=new Intl.PluralRules(\"en\",{type:\"ordinal\"}),r=new Map([[\"one\",\"st\"],[\"two\",\"nd\"],[\"few\",\"rd\"],[\"other\",\"th\"]]),n=t.select(e),o=r.get(n);return\`${e}${o}\`};function a(e,t=\"en\"){let r=new Date(new Date(e).toUTCString()),n={year:\"numeric\",month:\"long\",day:\"numeric\"};if(t.startsWith(\"en\")){let o=r.toLocaleDateString(t,n),i=/([A-Z]\\w+) ([0-9]{1,2}), ([0-9]{4})/g;return o.replace(i,(d,s,f,u)=>\`${s} ${l(f)}, ${u}\`)}return r.toLocaleDateString(t,n)}var c=a;var x={year:c(Date.now())};})();\n");
    assert.strictEqual(nojsJs, "(()=>{document.documentElement.className=\"js\";})();\n");
});

test("Uses Markdown plugin", async () => {
    let indexPage = fs.readFileSync("_site/index.html", "utf8");
    assert.ok(indexPage.includes("<dl><dt>Widdershins</dt><dd>Counter-clockwise.</dd></dl>"));
});

test("Uses Markdown plugin with options", async () => {
    let indexPage = fs.readFileSync("_site/index.html", "utf8");
    assert.ok(indexPage.includes("<h2 id=\"definitions\" tabindex=\"-1\"><a class=\"header-anchor\" href=\"#definitions\"><span>Definitions</span></a></h2>"));
});

test("Translates strings with placeholders", async () => {
    let englishIndexPage = fs.readFileSync("_site/index.html", "utf8");
    assert.ok(englishIndexPage.includes("Hello Alice!"));

    let frenchIndexPage = fs.readFileSync("_site/fr/index.html", "utf8");
    assert.ok(frenchIndexPage.includes("Bonjour Alice !"));
});

test("Translates singular/plural strings with placeholders", async () => {
    let englishIndexPage = fs.readFileSync("_site/index.html", "utf8");
    assert.ok(englishIndexPage.includes("6 posts"));

    let frenchIndexPage = fs.readFileSync("_site/fr/index.html", "utf8");
    assert.ok(frenchIndexPage.includes("6 articles"));
});

test("Generates English permalinks", async () => {
    let englishPost = fs.readFileSync("_site/posts/introduction/index.html", "utf8");
    assert.ok(englishPost.includes("<h1>Introduction</h1>"));

    let english404 = fs.readFileSync("_site/404.html", "utf8");
    assert.ok(english404.includes("<h1>Page Not Found</h1>"));
});

test("Generates permalinks from a custom slug", async () => {
    let tlaPage = fs.readFileSync("_site/tla/index.html", "utf8");
    assert.ok(tlaPage.includes("<h1>Three Letter Acronym</h1>"));
});

test("Generates French permalinks", async () => {
    let frPost = fs.readFileSync("_site/fr/articles/introduction/index.html", "utf8");
    assert.ok(frPost.includes("<h1>Introduction</h1>"));

    let fr404 = fs.readFileSync("_site/fr/404.html", "utf8");
    assert.ok(fr404.includes("<h1>Page non trouvée</h1>"));
});

test("Generates user-configured language permalinks", async () => {
    let dePost = fs.readFileSync("_site/de/artikel/einfuehrung/index.html", "utf8");
    assert.ok(dePost.includes("<h1>Einführung</h1>"));
});

/*
Copyright the eleventy-plugin-fluid copyright holders.

See the AUTHORS.md file at the top-level directory of this distribution and at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/AUTHORS.md.

Licensed under the New BSD license. You may not use this file except in compliance with this License.

You may obtain a copy of the New BSD License at
https://github.com/fluid-project/eleventy-plugin-fluid/raw/main/LICENSE.md.
*/
"use strict";

const fs = require("fs");
const test = require("ava");
const Eleventy = require("@11ty/eleventy");

test.before(async function () {
    let elev = new Eleventy();
    await elev.write();
});

test("Builds minified CSS from CSS", async function (t) {
    let mainCss = fs.readFileSync("dist/assets/styles/app.css", "utf8");
    let timelineCss = fs.readFileSync("dist/assets/styles/pages/timeline.css", "utf8");
    t.is(mainCss, "*{box-sizing:border-box}button{font-family:inherit;font-size:1rem}*+*{margin-top:var(--space,1em)}");
    t.is(timelineCss, ".timeline ul{padding-inline-start:0;list-style:none}");
});

test("Builds minified CSS from Sass", async function (t) {
    let sassCss = fs.readFileSync("dist/assets/styles/sass.css", "utf8");
    t.is(sassCss, "a{color:#600}mark{background-color:#f90}");
});

test("Builds minified JavaScript", async function (t) {
    let appJs = fs.readFileSync("dist/assets/scripts/app.js", "utf8");
    let nojsJs = fs.readFileSync("dist/assets/scripts/no-js.js", "utf8");
    t.is(appJs, "\"use strict\";(()=>{var s=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var c=s((S,a)=>{\"use strict\";var m=function(e){let t=new Intl.PluralRules(\"en\",{type:\"ordinal\"}),r=new Map([[\"one\",\"st\"],[\"two\",\"nd\"],[\"few\",\"rd\"],[\"other\",\"th\"]]),n=t.select(e),o=r.get(n);return`${e}${o}`};a.exports=function(t,r=\"en\"){let n=new Date(new Date(t).toUTCString()),o={year:\"numeric\",month:\"long\",day:\"numeric\"};if(r.startsWith(\"en\")){let l=n.toLocaleDateString(r,o),d=/([A-Z]\\w+) ([0-9]{1,2}), ([0-9]{4})/g;return l.replace(d,($,p,w,g)=>`${p} ${m(w)}, ${g}`)}return n.toLocaleDateString(r,o)}});var u=s((q,i)=>{\"use strict\";var D=c();i.exports=D});var h=s((L,f)=>{var x=u();f.exports={year:x(Date.now())}});h();})();\n");
    t.is(nojsJs, "\"use strict\";(()=>{document.documentElement.className=\"js\";})();\n");
});

test("Renders Markdown via shortcode", async function (t) {
    let testHtml = fs.readFileSync("dist/test.html", "utf8");
    t.true(testHtml.includes("<h1>eleventy-plugin-fluid</h1>"));
});

test("Doesn't render unsupported template language via shortcode", async function (t) {
    let testHtml = fs.readFileSync("dist/test.html", "utf8");
    t.true(testHtml.includes("{{ 'This template language doesn't exist!' }}"));
});

test("Renders Markdown via filter", async function (t) {
    let testHtml = fs.readFileSync("dist/test.html", "utf8");
    t.true(testHtml.includes("<p>Not much to see here!</p>"));
});

test("Generates English permalinks", async function (t) {
    let englishPost = fs.readFileSync("dist/posts/introduction/index.html", "utf8");
    t.true(englishPost.includes("<h1>Introduction</h1>"));

    let english404 = fs.readFileSync("dist/404.html", "utf8");
    t.true(english404.includes("<h1>Page Not Found</h1>"));
});

test("Generates French permalinks", async function (t) {
    let frPost = fs.readFileSync("dist/fr/posts/introduction/index.html", "utf8");
    t.true(frPost.includes("<h1>Introduction</h1>"));

    let fr404 = fs.readFileSync("dist/fr/404.html", "utf8");
    t.true(fr404.includes("<h1>Page non trouvée</h1>"));
});

test("Generates user-configured language permalinks", async function (t) {
    let dePost = fs.readFileSync("dist/de/posts/einfuehrung/index.html", "utf8");
    t.true(dePost.includes("<h1>Einführung</h1>"));
});

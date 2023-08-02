# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v2.0.0...v2.1.0) (2023-08-02)


### Features

* use configured input and output paths ([#190](https://github.com/fluid-project/eleventy-plugin-fluid/issues/190)) ([253e59a](https://github.com/fluid-project/eleventy-plugin-fluid/commit/253e59a02b5cbf248fa3adea924e5fb5a5a974c5))

## [2.0.0](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v1.2.0...v2.0.0) (2023-08-02)


### ⚠ BREAKING CHANGES

* allow processing to be disabled (resolves #174) ([#176](https://github.com/fluid-project/eleventy-plugin-fluid/issues/176))

### Features

* add shared Markdown configuration and renderString shortcode (resolves [#158](https://github.com/fluid-project/eleventy-plugin-fluid/issues/158)) ([#179](https://github.com/fluid-project/eleventy-plugin-fluid/issues/179)) ([88f9c3b](https://github.com/fluid-project/eleventy-plugin-fluid/commit/88f9c3b616d079ab0fb4019d7e72f3b4a9745810))
* allow processing to be disabled (resolves [#174](https://github.com/fluid-project/eleventy-plugin-fluid/issues/174)) ([#176](https://github.com/fluid-project/eleventy-plugin-fluid/issues/176)) ([10c6b0c](https://github.com/fluid-project/eleventy-plugin-fluid/commit/10c6b0c00002e5006effe9340c7ce8e0f323a26b))
* include localization utilities in eleventy-plugin-fluid ([#184](https://github.com/fluid-project/eleventy-plugin-fluid/issues/184)) ([216b336](https://github.com/fluid-project/eleventy-plugin-fluid/commit/216b3368e629309ef710e8df75bea2c8afe4c337))
* process JavaScript with esbuild (resolves [#4](https://github.com/fluid-project/eleventy-plugin-fluid/issues/4)) ([#175](https://github.com/fluid-project/eleventy-plugin-fluid/issues/175)) ([a417a8f](https://github.com/fluid-project/eleventy-plugin-fluid/commit/a417a8f2dd7094c73dee0add118601d124b7540b))
* process JS in an event rather than as a template format ([#180](https://github.com/fluid-project/eleventy-plugin-fluid/issues/180)) ([df8120f](https://github.com/fluid-project/eleventy-plugin-fluid/commit/df8120fefc1d48eb1ea59c934a4912427822908e))
* use Eleventy configuration for basePaths ([df8120f](https://github.com/fluid-project/eleventy-plugin-fluid/commit/df8120fefc1d48eb1ea59c934a4912427822908e))


### Bug Fixes

* resolve issue where use of eleventyConfig variables omitted files ([#181](https://github.com/fluid-project/eleventy-plugin-fluid/issues/181)) ([eccd990](https://github.com/fluid-project/eleventy-plugin-fluid/commit/eccd990232044cafb3cb91a62cba6e8f06321ffb))
* resolve missing forward slash in configuration ([#182](https://github.com/fluid-project/eleventy-plugin-fluid/issues/182)) ([271b6c8](https://github.com/fluid-project/eleventy-plugin-fluid/commit/271b6c8d18606b53cafee7244a9055479011f39c))

## [1.2.0](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v1.1.0...v1.2.0) (2023-07-13)


### Features

* add Sass processing configuration ([#168](https://github.com/fluid-project/eleventy-plugin-fluid/issues/168)) ([26e55b5](https://github.com/fluid-project/eleventy-plugin-fluid/commit/26e55b5f32958990330d25af17bfe9597ebcb361))

## [1.1.0](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v1.0.2...v1.1.0) (2023-07-11)


### Features

* add CSS processing configuration (resolves [#3](https://github.com/fluid-project/eleventy-plugin-fluid/issues/3)) ([#164](https://github.com/fluid-project/eleventy-plugin-fluid/issues/164)) ([c65a7cb](https://github.com/fluid-project/eleventy-plugin-fluid/commit/c65a7cb94e0eae9b968c2f57975b6aee98e59267))

## [1.0.2](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v1.0.1...v1.0.2) (2023-06-28)


### Bug Fixes

* resolve issue with props-only UIO implementation ([#159](https://github.com/fluid-project/eleventy-plugin-fluid/issues/159)) ([6f8e33b](https://github.com/fluid-project/eleventy-plugin-fluid/commit/6f8e33b6657e4c0c3ce0d2180a03f066305e7fb1))

## [1.0.1](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v1.0.0...v1.0.1) (2023-06-14)


### Bug Fixes

* resolve incompatibility between the Markdown filter and Eleventy v2.0.1 ([#156](https://github.com/fluid-project/eleventy-plugin-fluid/issues/156)) ([4b0643a](https://github.com/fluid-project/eleventy-plugin-fluid/commit/4b0643a2ec02e2c403ec12cb13c8e265aa8e42ee))

## [1.0.0](https://github.com/fluid-project/eleventy-plugin-fluid/compare/v0.3.1...v1.0.0) (2022-03-22)


### ⚠ BREAKING CHANGES

* chore(deps-dev): require Eleventy 1.0

### Features

* add internationalization support to formatDate (fix [#60](https://github.com/fluid-project/eleventy-plugin-fluid/issues/60)) ([a8511e7](https://github.com/fluid-project/eleventy-plugin-fluid/commit/a8511e7a40488bdaba1968ff11cd218ace3076e0))
* markdown filter inherits base configuration (fix [#85](https://github.com/fluid-project/eleventy-plugin-fluid/issues/85)) ([a8511e7](https://github.com/fluid-project/eleventy-plugin-fluid/commit/a8511e7a40488bdaba1968ff11cd218ace3076e0))
* support Eleventy 1.0 (resolve [#93](https://github.com/fluid-project/eleventy-plugin-fluid/issues/93)) ([#109](https://github.com/fluid-project/eleventy-plugin-fluid/issues/109)) ([a8511e7](https://github.com/fluid-project/eleventy-plugin-fluid/commit/a8511e7a40488bdaba1968ff11cd218ace3076e0))


### Bug Fixes

* add fluid.css to uioStyles shortcode and add shortcode for CSS Custom Props (resolves [#81](https://github.com/fluid-project/eleventy-plugin-fluid/issues/81)) ([#110](https://github.com/fluid-project/eleventy-plugin-fluid/issues/110)) ([90d2489](https://github.com/fluid-project/eleventy-plugin-fluid/commit/90d24892786246830659ca9934ba3c210c4e4ff8))

### [0.3.1](https://www.github.com/fluid-project/eleventy-plugin-fluid/compare/v0.3.0...v0.3.1) (2021-10-04)


### Bug Fixes

* exclude package.json from lintspaces.jsonindentation ([d7904d9](https://www.github.com/fluid-project/eleventy-plugin-fluid/commit/d7904d9d3f1b579c0c1a6df0b32e9e77d3abdb3d))
* prevent injection of `<br>` tags for line breaks in `<p>` (Resolves [#76](https://www.github.com/fluid-project/eleventy-plugin-fluid/issues/76)) ([#77](https://www.github.com/fluid-project/eleventy-plugin-fluid/issues/77)) ([3208197](https://www.github.com/fluid-project/eleventy-plugin-fluid/commit/32081973d4f8f685fc2150c1eb7567e2eda9f350))

## [0.3.0](https://www.github.com/fluid-project/eleventy-plugin-fluid/compare/v0.2.1...v0.3.0) (2021-08-23)


### Features

* add HTML minifier (resolves [#20](https://www.github.com/fluid-project/eleventy-plugin-fluid/issues/20)) ([#29](https://www.github.com/fluid-project/eleventy-plugin-fluid/issues/29)) ([6ba865b](https://www.github.com/fluid-project/eleventy-plugin-fluid/commit/6ba865b6231a888055a60f102cd13a056e94ce49))
* add multilingual UIO (resolves [#58](https://www.github.com/fluid-project/eleventy-plugin-fluid/issues/58)) ([#67](https://www.github.com/fluid-project/eleventy-plugin-fluid/issues/67)) ([e1f80bc](https://www.github.com/fluid-project/eleventy-plugin-fluid/commit/e1f80bc3e5048b2fb5f584b944785fd15387af32))


### Bug Fixes

* exclude package-lock.json ([9b266de](https://www.github.com/fluid-project/eleventy-plugin-fluid/commit/9b266de37770fdacfcbf39006818294d49b524ce))

### [0.2.1](https://github.com/fluid-project/eleventy-plugin-fluid/compare/0.2.0...0.2.1) (2021-02-08)


### Bug Fixes

* move infusion to peerDependencies and add installation guide to README ([#32](https://github.com/fluid-project/eleventy-plugin-fluid/issues/32)) ([98c6657](https://github.com/fluid-project/eleventy-plugin-fluid/commit/98c66575a9f5dbcc39366cdae4e6d413bfb81933))
* resolve issue with paired figure shortcode ([585346d](https://github.com/fluid-project/eleventy-plugin-fluid/commit/585346d68e4754c36d3609e51543aaa1889cf13f))

## [0.2.0](https://github.com/fluid-project/eleventy-plugin-fluid/compare/0.1.0...0.2.0) (2021-02-04)


### Features

* update to development version of Infusion ([589ba25](https://github.com/fluid-project/eleventy-plugin-fluid/commit/589ba25927d7f28c3c6d68b60510bb81b8543b27))


## 0.1.0 (2020-12-08)


### Features


* add date, ISO date, and Markdown filters (resolve [#1](https://github.com/fluid-project/eleventy-plugin-fluid/issues/1)) ([#5](https://github.com/fluid-project/eleventy-plugin-fluid/issues/5)) ([62512ef](https://github.com/fluid-project/eleventy-plugin-fluid/commit/62512efc46da81688a5751f307bc1aac622ddffd))
* add figure shortcode (resolves [#16](https://github.com/fluid-project/eleventy-plugin-fluid/issues/16)) ([#17](https://github.com/fluid-project/eleventy-plugin-fluid/issues/17)) ([4cf140c](https://github.com/fluid-project/eleventy-plugin-fluid/commit/4cf140c4ce738465d1068a7dac4037a00cf7ca76))
* add passthroughCopy and shortcodes for UIO (resolves [#2](https://github.com/fluid-project/eleventy-plugin-fluid/issues/2)) ([#7](https://github.com/fluid-project/eleventy-plugin-fluid/issues/7)) ([f361b6a](https://github.com/fluid-project/eleventy-plugin-fluid/commit/f361b6a3fcd9afea9d678034a859adb704b40c75))
* add split filter ([#9](https://github.com/fluid-project/eleventy-plugin-fluid/issues/9)) ([47efccc](https://github.com/fluid-project/eleventy-plugin-fluid/commit/47efcccbf846796b34b27adfbe31bc0dde680e75))
* add limit filter and slug filter ([1dcdce2](https://github.com/fluid-project/eleventy-plugin-fluid/commit/1dcdce2c8f19ac09e2e8cd0a4661387059e57dd2))


### Bug Fixes

* handle expected date string from Eleventy in formatDate filter ([#6](https://github.com/fluid-project/eleventy-plugin-fluid/issues/6)) ([68cec7b](https://github.com/fluid-project/eleventy-plugin-fluid/commit/68cec7b04180de3b4fe1ac1a3867d90525fa2b11))
* rename date filter to formatDate for clarity ([c31c7c2](https://github.com/fluid-project/eleventy-plugin-fluid/commit/c31c7c248748749b5de80c4f6b21694818050dda))
* rename date variable to prevent conflict ([07523b9](https://github.com/fluid-project/eleventy-plugin-fluid/commit/07523b990083f6283a5f266fcc0515e22fb52c83))

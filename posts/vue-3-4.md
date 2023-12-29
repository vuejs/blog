---
title: Announcing Vue 3.4
date: 2023-12-28
author: Evan You
gravatar: eca93da2c67aadafe35d477aa8f454b8
twitter: '@youyuxi'
---

Today we're excited to announce the release of Vue 3.4 "🏀 Slam Dunk"!

This release includes some substantial internal improvements - most notably a rewritten template parser that is 2x faster, and a refactored reactivity system that makes effect triggering more accurate and efficient. It also packs a number of quality-of-life API improvements, including the stabilization of `defineModel` and a new same-name shorthand when binding props.

This post provides an overview of the highlighted features in 3.4. For the full list of changes, please consult
[the full changelog on GitHub](https://github.com/vuejs/core/blob/main/CHANGELOG.md#340-2023-12-28).

---

[[TOC]]

## Potential Actions Needed

1. To fully leverage new features in 3.4, it is recommended to also update the following dependencies when upgrading to 3.4:

   - Volar / vue-tsc@^1.8.27 (**required**)
   - @vitejs/plugin-vue@^5.0.0 (if using Vite)
   - nuxt@^3.9.0 (if using Nuxt)
   - vue-loader@^17.4.0 (if using webpack or vue-cli)

2. If using TSX with Vue, check actions needed in [Removed: Global JSX Namespace](#removed-global-jsx-namespace).

3. Make sure you are no longer using any deprecated features (if you are, you should have warnings in the console telling you so). They may have been [removed in 3.4](#other-removed-features).

## Feature Highlights

### 2X Faster Parser and Improved SFC Build Performance

- Context: [PR#9674](https://github.com/vuejs/core/pull/9674)

In 3.4, we completely rewrote the template parser. Previously, Vue used a recursive descent parser that relied on many regular expressions and look-ahead searches. The new parser uses a state-machine tokenizer based on the tokenizer in [htmlparser2](https://github.com/fb55/htmlparser2), which iterates through the entire template string only once. The result is a parser that is consistently twice as fast for templates of all sizes. Thanks to our extensive test cases and [ecosystem-ci](https://github.com/vuejs/ecosystem-ci), it is also 100% backwards compatible for Vue end users.

While integrating the new parser with other parts of the system, we also discovered a few opportunities to further improve the overall SFC compilation performance. The benchmarks show a ~44% improvement when compiling the script and template parts of a Vue SFC while generating source maps, so 3.4 should result in faster builds for most projects using Vue SFCs. However, do note that Vue SFC compilation is only one part of the entire build process in real world projects. The final gain in end-to-end build time will likely be much smaller compared to the isolated benchmarks.

Outside of Vue core, the new parser will also benefit the performance of Volar / vue-tsc, and community plugins that need to parse Vue SFCs or templates, e.g. Vue Macros.

### More Efficient Reactivity System

**Context: [PR#5912](https://github.com/vuejs/core/pull/5912)**

3.4 also ships a substantial refactor of the reactivity system, with the goal of improving re-compute efficiency of computed properties.

To illustrate what is being improved, let's consider the following scenario:

```js
const count = ref(0)
const isEven = computed(() => count.value % 2 === 0)

watchEffect(() => console.log(isEven.value)) // logs true

count.value = 2 // logs true again
```

Before 3.4, the callback of `watchEffect` will fire every time `count.value` is changed, even if the computed result remains the same. With the post-3.4 optimizations, the callback now only fires if the computed result has actually changed.

In addition, in 3.4:

- Multiple computed dep changes only trigger sync effects once.
- Array `shift`, `unshift`, `splice` methods only trigger sync effects once.

In addition to the gains shown in the [benchmarks](https://github.com/vuejs/core/pull/5912#issuecomment-1748985641), this should reduce unnecessary component re-renders in many scenarios while retaining full backwards compatibility.

### `defineModel` is Now Stable

**Context: [RFC#503](https://github.com/vuejs/rfcs/discussions/503)**

`defineModel` is a new `<script setup>` macro that aims to simplify the implementation of components that support `v-model`. It was previously shipped in 3.3 as an experimental feature, and has graduated to stable status in 3.4. It now also provides better support for usage with `v-model` modifiers.

Relevant Documentation:
- [Revised Component v-model section](https://vuejs.org/guide/components/v-model.html)
- [defineModel API reference](https://vuejs.org/api/sfc-script-setup.html#definemodel)

### `v-bind` Same-name Shorthand

**Context: [PR#9451](https://github.com/vuejs/core/pull/9451)**

You can now shorten this:

```vue-html
<img :id="id" :src="src" :alt="alt">
```

To this:

```vue-html
<img :id :src :alt>
```

This feature has been frequently requested in the past. Originally, we had concerns about its usage being confused with boolean attributes. However, after revisiting the feature, we now think it makes sense for `v-bind` to behave a bit more like JavaScript than native attributes, considering its dynamic nature.

### Improved Hydration Mismatch Errors

**Context: [PR#5953](https://github.com/vuejs/core/pull/5953)**

3.4 ships a number of improvements to hydration mismatch error messages:

1. Improved clarity of the wording (rendered by server vs. expected on client).
2. The message now includes the DOM node in question so you can quickly locate it on the page or in the elements panel.
3. Hydration mismatch checks now also apply to class, style, and other dynamically bound attributes.

In addition, 3.4 also adds a new compile-time flag, [`__VUE_PROD_HYDRATION_MISMATCH_DETAILS__`](https://vuejs.org/api/compile-time-flags.html#vue-prod-hydration-mismatch-details), which can be used to force hydration mismatch errors to include full details even in production.

### Error Code and Compile-time Flag Reference

To reduce bundle size, Vue drops long error message strings in production builds. However, this means errors caught by error handlers in production will receive short error codes that are difficult to decipher without diving into Vue's source code.

To improve this, we have added a [Production Error Reference Page](https://vuejs.org/error-reference/) to the documentation. The error codes are automatically generated from the latest version of Vue stable release.

We have also added a [Compile-Time Flags Reference](https://vuejs.org/api/compile-time-flags.html) with instructions on how to configure these flags for different build tools.

## Removed Deprecated Features

### Global JSX Namespace

Starting in 3.4, Vue no longer registers the global `JSX` namespace by default. This is necessary to avoid global namespace collision with React so that TSX of both libs can co-exist in the same project. This should not affect SFC-only users with latest version of Volar.

If you are using TSX, there are two options:

1. Explicitly set [jsxImportSource](https://www.typescriptlang.org/tsconfig#jsxImportSource) to `'vue'` in `tsconfig.json` before upgrading to 3.4. You can also opt-in per file by adding a `/* @jsxImportSource vue */` comment at the top of the file.

2. If you have code that depends on the presence of the global `JSX` namespace, e.g. usage of types like `JSX.Element` etc., you can retain the exact pre-3.4 global behavior by explicitly referencing `vue/jsx`, which registers the global `JSX` namespace.

Note that this is a type-only breaking change in a minor release, which adheres to our [release policy](https://vuejs.org/about/releases.html#semantic-versioning-edge-cases).

### Other Removed Features

- [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) was marked deprecated in 3.3 and is now removed in 3.4. This change does not require a major due to the feature being experimental. Users who wish to continue using the feature can do so via the [Vue Macros plugin](https://vue-macros.dev/features/reactivity-transform.html).
- `app.config.unwrapInjectedRef` has been removed. It was deprecated and enabled by default in 3.3. In 3.4 it is no longer possible to disable this behavior.
- `@vnodeXXX` event listeners in templates are now a compiler error instead of a deprecation warning. Use `@vue:XXX` listeners instead.
- `v-is` directive has been removed. It was deprecated in 3.3. Use the [`is` attribute with `vue:` prefix](https://vuejs.org/api/built-in-special-attributes.html#is) instead.

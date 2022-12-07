---
title: On Escape's Vue 2 to Svelte Migration
date: 2022-12-05
author: Evan You
gravatar: eca93da2c67aadafe35d477aa8f454b8
twitter: '@youyuxi'
---

Recently, folks at Escape shared a [blog post](https://escape.tech/blog/from-vue2-to-svelte/) talking about their migration from Vue 2 to Svelte, and compared Vue 3 with Svelte. We found that the article contained a number of inaccuracies. In this post, we will share some thoughts from our perspective and hope to clarify the potential misconceptions the post could give rise to.

---

Before we dive into the details, we would like to emphasize that we respect developers' choice of technology and believe that you should use what makes you more productive. We also have immense respect for the Svelte team, especially for their pursuit of simplicity and conciseness in API design.

## Clarification Points

The original post included a comparison chart that contains a number of issues that deserves clarification:

![comparison-chart](/compare.png)

### Typing

> Vue 3 does not supported typed events

This has been available since 3.2 ([relevant documentation](https://vuejs.org/guide/typescript/composition-api.html#typing-component-emits)).

Aside from this, we disagree with the conclusion that "Svelte offers a better typing experience". To our best knowledge, TypeScript support for Vue 3 and Svelte in their current state are fairly comparable.

### Restricted Global Access

> Cannot import and use TypeScript enums in a Vue component

This is incorrect. Here is [an example](https://sfc.vuejs.org/#eNpVjz0OwjAMha9iZWGBZK8qJBZOkaWNDLQiP4pdQKpyd5y0AyxWPsfPz29Vl5T0a0HVqZ5cnhIDIS/pbMPkU8wMK1xjhAK3HD0ctGEk1kwHG3qzKWRWgNGn58AoBLA2lR6glB8c/9E17GXjrlRHtZme/JD0TDHIWWtV2P2DrOqgdWpP7q5s1YM5UWcM3VwNM5OO+W7kpfMSePKokfxpzPFNmGWxVXWFmBex3AOJFX5aYhcDMWBYfIve7IZjrWOrrurKF/sKa48=). In fact, it works exactly the same between Vue and Svelte.

### External Reactive Objects

> Partial (for objects only)

This is a bit vague and was not explained further in the post, but all Vue's [reactivity APIs](https://vuejs.org/api/reactivity-core.html), including `ref`, `computed` and watchers, can be used outside of components to serve as simple cross-component stores.

### Error Boundaries

Vue has always provided the capability of capturing errors thrown from descendent component trees in an ancestor component, through the [onErrorCaptured](https://vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured) lifecycle hook. This includes errors thrown from async event handlers and lifecycle hooks as well.

Vue does not have a built-in for handling Promise state directly in the template, but this can be easily achieved with libraries such as [vue-promised](https://github.com/posva/vue-promised).

### Integrating with Libraries

> It's simpler to add pure js plugins in Svelte

The post included an example of integrating with Prism.js to support this point. However, in Vue it would work exactly the same when using `<script setup>`.

### Meta Frameworks

The post also compares meta frameworks built on top of Vue and Svelte, namely Nuxt and SvelteKit, and lists Vite as an advantage for SvelteKit. However, Nuxt 3 has just reached stable and also uses Vite by default. Both the Nuxt team and the SvelteKit team have close working relationship with the Vite team.

## Syntax

We respect different syntax preferences, but it is also important to discuss the trade-offs between the designs.

First of all, we do not believe that differences like single vs. double curly braces, element-bound directives vs. mustache-style control flows, or the need of an extra `<template>` tag will have substantial impact on your long term productivity. Template syntax is something that will be quickly internalized over time.

When it comes to reactivity, Svelte does offer a very succinct syntax for declaring and mutating component state, and there are several points worth discussing:

1. For expressing reactivity, there are three basic concepts: state, derived state, and effects. Svelte uses plain variables for state, and the magic `$` symbol for both derived state and effects. Vue uses explicit APIs for declaring each (`ref`, `computed,` `watchEffect`). Some users may prefer magical syntax, while others may prefer explicit APIs - there is room for both camps.

2. Svelte's compiler-based reactivity limits where such syntax can be used. It cannot be used outside of Svelte components, or in use cases where a build step is not possible. Whereas for Vue, the Composition API can be used the same way in and out of components, or even in no-build-step setups.

3. Because of (2), Svelte needs to provide an additional set of API (stores) for managing the same reactivity concepts outside of components. Since the two syntaxes are not easily convertible into one another, it creates friction for moving / refactoring logic out of components.

With that said, we have been experimenting with a feature called [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) in Vue, which allows you to author Vue components like this:

```vue
<script setup>
let count = $ref(0)

function increment() {
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

It provides a level of brevity similar to Svelte, but is also usable in plain JS/TS files. It's also straightforward to automatically de-sugar the syntax into plain Composition API code.

## Performance and Bundle Size

Improved performance and bundle size was mentioned as one of the reasons for the migration. While there is no doubt Svelte is highly performant and lightweight, an improvement over other frameworks isn't necessarily guaranteed. In reality, it could depend on other factors, including actual implementations, room for optimization, and scale of the app.

For reference, Vue 3 is able to outperform Svelte in the [js-framework-benchmark](https://krausest.github.io/js-framework-benchmark/index.html) with a small amount of optimization. Vue 3 achieves this with a runtime / compiler hybrid rendering model which we call [Compiler-Informed Virtual DOM](https://vuejs.org/guide/extras/rendering-mechanism.html#compiler-informed-virtual-dom). It leverages information that can be known at compile time to optimize runtime performance, while retaining compatibility with manually-written render functions.

In terms of bundle size, Svelte is great for generating widgets or web components that contain only a single or a few components, but its light runtime size can be offset by its more verbose per-component code output compared to other frameworks. [This research](https://github.com/yyx990803/vue-svelte-size-analysis) shows that Svelte's app bundle size can become a disadvantage in larger scale apps, especially with SSR hydration enabled.

It should be noted that both Svelte and Vue 3 are most likely performant enough for your use case, and that both frameworks will continue to evolve and improve. The Svelte team has mentioned plans for improved per-component code output size in Svelte 4. On the Vue side, we are also exploring an alternative, more performant compilation strategy (codename: Vapor) that is inspired by [Solid.js](https://www.solidjs.com/). Vapor mode will allow Vue components to be compiled into a format that does not involve the Virtual DOM runtime. It is currently still in research phase, and we will share more details about it in 2023.

## Retention Data in the State of JS Survey

In addition, a major point of consideration mentioned involved the satisfaction rating from the State of JavaScript survey. While Svelte definitely deserves its high rating in the survey, using such ratings to decide whether you should migrate your app can impact your team negatively since there are lots of missing context.

In the survey, the satisfaction rating of a framework is defined as the ratio of number of users who would use it again, compared to those who would not. Note this number is only calculated based on the responses from the users who have used a framework. It should be fair to say that this formula naturally favors newer technologies. In theory, if a framework has only one user and that user reports that they would use it again, the framework would get a perfect 100% score!

A technology in its early phase primarily attracts users who like the technology by itself. When it goes mainstream, however, it starts to get adopted in larger scale organizations where the tech choice decision is made top-down. This means there will be more and more users who have to work with it regardless of their personal preferences. It also attracts more drive-by users who try it purely out of its popularity, but may not be the target audience. Furthermore, wider adoption challenges the tech in a wider range of scenarios, exposing issues that may only arise in more demanding cases.

On the other hand, a newer technology will probably not even make it into the survey if it fails to obtain a higher score than existing ones among its early adopters.

This is in no way meant to diminish the accomplishments of Svelte, nor is it an excuse for us. The Vue 2 to Vue 3 transition didn't go as smoothly as it could, and has definitely affected the satisfaction score. We hope we can turn it around by continuing to improve Vue 3. But hopefully you get the point: the number alone does not fully represent how "good" a framework is, let alone how it suits your use case. Remember that surveys are often subject to many confounding variables and contexts which may not apply to your situation, so be cautious of referring to them as gospel.

## Conclusion

At the end of the day, we think Svelte is a great framework and we wish Escape all the best with their work with Svelte! After all, while we wanted to clarify some of the comparison points made, we're all part of the same community and want to help people build amazing products for users.

---

Finally, if you have a codebase on Vue 2 and are concerned about the approaching end of life (EOY 2023), migrating isn't necessarily the only choice. Vue 2 is a stable, proven, and battle-tested piece of technology that will continue to work. Make sure to evaluate what your real gains and cost would be before committing to big migrations. For those that need to deal with security compliance, we are partnering with [HeroDevs](https://www.herodevs.com/) to provide paid extended support for Vue 2. If this is something your team will need, please register your interest [here](https://airtable.com/shrj37Zf4ZIfrxFzh).

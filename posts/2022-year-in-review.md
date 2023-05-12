---
title: '2022 Year In Review'
date: 2023-01-01
author: Evan You
gravatar: eca93da2c67aadafe35d477aa8f454b8
twitter: '@youyuxi'
---

Happy new year, Vue community! With 2023 upon us, we would like to take this opportunity to recap what happened in 2022, and discuss what to expect in 2023.

---

## Recap for 2022

In February 2022, we [switched Vue's default version to 3.x](./vue-3-as-the-new-default.html). The switch marked the readiness of all the official parts of the framework for v3, including a major revamp of the documentation that provides guidance on latest best practices.

We are still in a transition period for the ecosystem to move to Vue 3. So after the switch, we focused more on improving Vue's developer experience by investing in tooling. Our team members have been actively involved in the development of [Vite](https://vitejs.dev), and we made significant improvement to Vue's IDE and TypeScript support by shipping [Volar 1.0](./volar-1.0.html).

Over the course of 2022, we saw the NPM usage of Vue 3 grew by **almost 200%**. On the community side, the Vue 3 ecosystem is now ripe with great solutions to help boost your productivity. Both [Nuxt 3](https://nuxt.com) and [Vuetify 3](https://vuetifyjs.com) reached stable status in November 2022, and [NativeScript for Vue 3](https://github.com/nativescript-vue/nativescript-vue) recently launched beta. In addition, we want to give a shout out to other great projects that had already supported Vue 3 for quite some time: [Quasar](https://quasar.dev/), [NaiveUI](https://www.naiveui.com/), [Ionic Vue](https://ionicframework.com/docs/vue/overview), [PrimeVue](https://www.primefaces.org/primevue/), [InkLine](https://www.inkline.io/), [ElementPlus](https://element-plus.org/), and [more](https://twitter.com/vuejs/status/1599706412086878208).

Despite Vue 3 being now the default, we understand that many users have to stay on Vue 2 due to the cost of migration. To ensure that Vue 2 users benefit from the advancement of the framework, we decided to move Vue 2's source code to TypeScript and back-ported some of the most important Vue 3 features in [Vue 2.7](./vue-2-7-naruto.html). We also made sure that Vite, Vue Devtools and Volar all simultaneously support Vue 2 and Vue 3.

## What to Expect in 2023

### Smaller and More Frequent Minor Releases

With the last Vue 2 minor release (2.7) out of the door, we expect to be full steam ahead shipping features for Vue 3 core in 2023. We have quite a long list of features that we are excited to work on!

One thing we would like to improve is our release cadence. Vue follows [semver](https://semver.org/), which means we should only ship features in minor versions. In the past, we did a "big minor" approach where we group many features together in big, infrequent minor releases. This has resulted in quite some low-complexity features being blocked while we worked on other high-complexity ones. In 2023, we want to do smaller and more frequent minor releases so that we can get more features out, faster.

This also means we will be adjusting what goes into 3.3. Originally, we planned to graduate Suspense and Reactivity Transform from experimental status in 3.3. However, we feel that both still need further RFC discussion, and they should not block other more straightforward features to land. Now, the goal of 3.3 is to land proposed / planned features that are clear wins and do not require RFC discussion - for example, supporting externally imported types in `<script setup>` macros.

In parallel to that, we will:

1. Further evaluate the readiness of Suspense and Reactivity Transform.
2. Spend time to evaluate outstanding user-submitted RFCs and feature requests.
3. Post RFCs for features that we intend to land in 3.4 and beyond, for example SSR lazy hydration.

Expect more details later this month.

Another thing to note is there is no plan for big breaking changes for the foreseeable future. Acknowledging the challenges users faced during the v2 to v3 transition, we want to have a better long term upgrade story for Vue going forward.

### Vapor Mode

Vapor Mode is an alternative compilation strategy that we have been experimenting with, inspired by [Solid](https://www.solidjs.com/). Given the same Vue SFC, Vapor Mode compiles it into JavaScript output that is more performant, uses less memory, and requires less runtime support code compared to the current Virtual DOM based output. It is still in early phase, but here are some high level points:

- Vapor Mode is intended for use cases where performance is the primary concern. It is opt-in and does not affect existing codebases.

- At the very least, you will be able to embed a Vapor component subtree into any existing Vue 3 app. Ideally, we hope to achieve granular opt-in at the component level, which means freely mixing Vapor and non-Vapor components in the same app.

- Building an app with only Vapor components allows you to drop the Virtual DOM runtime from the bundle, significantly reducing the baseline runtime size.

- In order to achieve the best performance, Vapor Mode will only support a subset of Vue features. In particular, Vapor Mode components will only support Composition API and `<script setup>`. However, this supported subset will work exactly the same between Vapor and non-Vapor components.

We will share more details as we make more progress later in the year.

### Conferences

There are already many in-person Vue conferences lined up for 2023:

- [Vue.js Amsterdam](https://vuejs.amsterdam/) - Feb 9-10, Amsterdam, The Netherlands
- [Vue.js Live](https://vuejslive.com/) - May 12 & 15th, London, UK
- [VueConf US](https://us.vuejs.org/) - May 24-26th, New Orleans, USA
- VueFes Japan - October 28th, Tokyo, Japan (info TBA)

I (Evan) plan to attend all of these in person. After almost 3 years of absence, I can't wait to meet the community again - please come say hi!

### One Year Until Vue 2 EOL

As a reminder, today marks **exactly one year until the end of Vue 2 support**. We have created a page explaining the implication of this and outlining the options for those who expect to be using Vue 2 beyond the EOL date: [Details on Vue 2 EOL and Extended Support](https://v2.vuejs.org/lts/).

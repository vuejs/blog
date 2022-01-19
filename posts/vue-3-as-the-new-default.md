---
title: Vue 3 as the New Default
date: 2022-01-19
author: Evan You
gravatar: eca93da2c67aadafe35d477aa8f454b8
twitter: '@youyuxi'
---

TL;DR: Vue 3 will become the new default version on **February 3rd, 2022**!

---

## From a Library to a Framework

When Vue first started, it was just a runtime library. Over the years, it has evolved into a framework that encompasses many sub projects:

- The core library, i.e. the `vue` npm package
- The documentation, with enough content to be considered a book
- The build toolchain, i.e. Vue CLI, vue-loader and other supporting packages
- Vue Router for building SPA
- Vuex for state management
- Browser devtools extension for debugging and profiling
- Vetur, the VSCode extension for Single-File Component IDE support
- ESLint plugin for static style / error checking
- Vue Test Utils for component testing
- Custom JSX transforms that leverages Vue's runtime features
- VuePress for Vue-based static site generation

This is only possible because Vue is a community-driven project. Many of these projects were started by community members who later became Vue team members. The rest were originally started by me, but are now almost entirely maintained by the team (with the exception of the core library).

## Soft Launch of Vue 3

With the core releasing a new major version, all the other parts of the framework needed to move forward together. We also needed to provide a migration path for Vue 2 users. This was a massive undertaking for a community-drive team like Vue. When Vue 3 core was ready, most other parts of the framework were either in beta or still awaiting update. We decided to go ahead and release the core so that the early adopters, library authors and higher-level frameworks can start building with it while we worked on the rest of the framework.

At the same time, we kept Vue 2 as the default for documentation and npm installs. This is because we knew that for many users, Vue 2 still provided a more coherent and comprehensive experience until other parts of Vue 3 are refined.

## The New Vue

This soft launch process took longer than we hoped, but we are finally here: we are happy to announce that Vue 3 will become the new default version on **February 3rd, 2022** - 8 years after [Vue was first publicly announced](https://news.ycombinator.com/item?id=7169288).

Outside of Vue core, we have improved almost every aspect of the framework:

- Blazing fast, [Vite](https://vitejs.dev/)-powered build toolchain
- More ergonomic Composition API syntax via `<script setup>`
- Improved TypeScript IDE support for Single File Components via [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- Command line type checking for SFCs via [vue-tsc](https://github.com/johnsoncodehk/volar/tree/master/packages/vue-tsc)
- Simpler state management via [Pinia](https://pinia.vuejs.org/)
- New devtools extension with simultaneous Vue 2 / Vue 3 support and a [plugin system](https://devtools.vuejs.org/plugin/plugins-guide.html) that allows community libraries to hook into the devtools panels

We also completely reworked the main documentation. [The new vuejs.org](https://staging.vuejs.org) (currently in staging) will provide updated framework overview and recommendations, flexible learning paths for users from different backgrounds, the ability to toggle between Options API and Composition API throughout the guide and examples, and many new deep dive sections. It's also *very* fast - which we will discuss in more details in a separate blog post soon.

## Version Switch Details

Here are the details on what we mean by "the new default":

### npm dist tags

- `npm install vue` will install Vue 3.

- The `latest` dist tag of all other official npm packages will point to Vue 3 compatible versions, including `vue-router`, `vuex`, `@vue/test-utils`.

### Official docs and sites

All documentation and official sites will default to Vue 3 versions. These include:

- vuejs.org
- router.vuejs.org
- vuex.vuejs.org
- vue-test-utils.vuejs.org (will be moved to test-utils.vuejs.org)
- template-explorer.vuejs.org

Note that the new vuejs.org will be the [completely reworked version](https://staging.vuejs.org) instead of the version currently deployed at v3.vuejs.org.

The current Vue 2 versions of these sites will be moved to new addresses (the version prefixes indicate the libraries' respective versions, not Vue core's):

- vuejs.org -> v2.vuejs.org
- router.vuejs.org -> v3.router.vuejs.org
- vuex.vuejs.org -> v3.vuex.vuejs.org
- vue-test-utils.vuejs.org -> v1.test-utils.vuejs.org
- template-explorer.vuejs.org -> v2.template-explorer.vuejs.org

### GitHub repos

_The repo changes are already in effect as of this writing._

All GitHub repos under the `vuejs` organization will switch to Vue 3 versions in the default branch. In addition, we are renaming the following repos to remove `next` in their names:

- `vuejs/vue-next` -> [`vuejs/core`](https://github.com/vuejs/core)
- `vuejs/vue-router-next` -> [`vuejs/router`](https://github.com/vuejs/router)
- `vuejs/docs-next` -> [`vuejs/docs`](https://github.com/vuejs/docs)
- `vuejs/vue-test-utils-next` -> [`vuejs/test-utils`](https://github.com/vuejs/test-utils)
- `vuejs/jsx-next` -> [`vuejs/babel-plugin-jsx`](https://github.com/vuejs/babel-plugin-jsx)

In addition, translation repos for the main documentation are moved to the [`vuejs-translations` organization](https://github.com/vuejs-translations).

### Devtools extension

Devtools v6, which is currently published under the [beta channel](https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg) on Chrome Web Store, will be moved to the [stable channel](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) upon the version switch.

The current stable channel will still be available. It will be moved to the [legacy channel](https://chrome.google.com/webstore/detail/vuejs-devtools/iaajmlceplecbljialhhkmedjlpdblhp).

---
title: "Volar: a New Beginning"
date: 2023-02-08
author: Johnson Chu
avatar: https://avatars.githubusercontent.com/u/16279759?v=4
twitter: '@johnsoncodehk'
---

Most users of Volar know it as the official Vue.js VSCode extension. It started as a personal project when the official recommendation was still Vetur, and over time got adopted as the new official extension due to improved architecture and performance.

As a project created to improve the quality of life for developers, we spent over two years before [reaching 1.0](https://blog.vuejs.org/posts/volar-1.0.html), and have been continuously shipping stability improvements.

But we've still got more work to do, and there are exciting plans for 2023.

---

## Volar.js: the Embedded Language Tooling Framework

Although initially designed for the specific needs of Vue Single-File Components, Volar's codebase contains many parts that are not specific to Vue, such as:

- Processing of embedded programming languages (a common problem for multiple meta frameworks)
- The Vue Language Server is actually a fully-fledged TypeScript Language Server
- Code for handling interaction with LSP / Web / Embedded Language Services, and more

We have now extracted these common parts out into a framework-agnostic set of tools. These tools are now maintained as a new, separate project: [Volar.js](https://volarjs.github.io/).

Volar.js is architected to support any file format that involves embedded languages - not just Vue, but also Astro, Svelte, or even Angular. It is also capable of implementing regular single-language LSP servers such as TypeScript, CSS, and HTML.

Another major focus of Volar.js is performance. It aims to minimize the overhead to achieve the performance of a native embedded language service. There are many issues and optimization opportunities that could only be discovered over time with a sizable user base, and Volar.js is optimized based on the learnings we have accumulated from millions of downloads.

As an example, ByteDance's Lynx team, an early adopter of Volar.js, shipped a whole set of language tools supporting their in-house framework with two weeks of work from a single developer. That would have taken months if it were built from scratch even with a team.

## The old Volar is now vuejs/language-tools

With the core extracted, the codebase for the original Volar extension and `vue-tsc` has been moved to the [`vuejs/language-tools`](https://github.com/vuejs/language-tools) repo. This repo now depends on Volar.js and contains code for Vue-specific support.

We will also move some npm packages from the `@volar` npm organization to `@vue` - but these changes should not affect end users.

## Team and Organization

Similar to how [Vite](https://vitejs.dev/) was born out of the Vue ecosystem and eventually grew into its own community that connects users from the entire web dev ecosystem, Volar.js hopes to follow the same path.

I ([@johnsoncodehk](https://github.com/johnsoncodehk)) have established the Volar.js Core Team with Erika ([@erika](https://elk.zone/mastodon.gamedevalliance.fr/@erika)), an Astro core team member. Erika shares my vision and dedication towards improving people's development experience. We will work together to improve the DX for all web devs, not just Vue and Astro.

We have created the [`volarjs` organization](https://github.com/volarjs) to maintain the framework and related repos.

- [volar.js](https://github.com/volarjs/volar.js): Core of the framework
- [plugins](https://github.com/volarjs/plugins): Can be used in `volar.config.js` or plugins of the framework
- [volarjs.github.io](https://volarjs.github.io/): Official website
- [language-tools-starter](https://github.com/volarjs/language-tools-starter): Template for starting building a language server with Volar.js
- [ecosystem-ci](https://github.com/volarjs/ecosystem-ci): Used to run integration tests for volar ecosystem projects
- [pug-language-tools](https://github.com/volarjs/pug-language-tools): Pug tools based on language-tools-starter
- [angular-language-tools](https://github.com/volarjs/angular-language-tools): Angular example based on language-tools-starter
- [svelte-language-tools](https://github.com/volarjs/svelte-language-tools): Svelte example based on language-tools-starter

In addition, I'm thrilled to announce that:

**[StackBlitz](https://stackblitz.com/) will be supporting me full time to work on Volar.js!**

We are excited about the future and can't wait to see what we can achieve in the coming months!

## Next Steps

We are just getting started so we don't have a clear long-term roadmap yet, but here are some major directions that we plan to explore and work on next.

### Monaco Support

Monaco's support for Vue is currently implemented by `monaco-volar`, and we plan to support it in the framework, so all language servers based on Volar.js will be able to take advantage of it easily.

### Support for IDEs other than VSCode

Many generous contributors have implemented language clients for other IDEs such as Vim, Sublime, Atom, Emacs, Nova, Lapce, etc. for Volar, in addition to VSCode.

Having a full set of IDE support can be of great reference value, as very few people can be proficient in all of these IDEs.

We will look for ways to leverage the efforts of these contributors to reduce the workload of framework adopters for implementing language clients outside of VSCode.

Additionally, although IntelliJ does not have first-class LSP support, we will look into whether it is possible to integrate it with the framework.

### Bun-base Language Server

Theoretically, the performance of Volar can only be infinitely close to, but not faster than the vanilla TS language server. However, if the Volar language server can get a performance boost by running in [Bun](https://bun.sh/), it might be a game changer.

Previously Bun's runtime was not yet compatible with Node.js-based LSP servers. We will keep an eye on related issues and try again when they are resolved.

Similarly, all language servers based on Volar.js will be able to benefit directly from this.

### Monoserver

Imagine a scenario where every language would need to support some TypeScript features, so each language's language server would run its own expensive TypeScript Language Service instance, making things a bit scary, because both memory and CPU usage will increase doubly, and this situation has already happened today.

If some of these language servers were based on Volar.js, we might have some way for them to decide to only activate one language server, and then share the features of the rest of the language servers to the activated one, so that in the end we would only need to run TypeScript Language Service in one language server instance instead of multiple language servers.

This could also solve some use cases that TypeScript Plugins are not able to support.

Based on the Volar.js architecture, we are already very close to this goal, and I and Erika will explore this feature for the Vue and Astro language servers.

### Rules API (Built-in Linter)

You may have been tripped up when using ESLint and Prettier together, and our past attempts based on the Plugin API have not done a good job of avoiding this problem.

The Rules API is another attempt to avoid conflicts between different linting tools, while also ensures that performance and features are perfectly integrated with the IDE.

For meta-frameworks, they would need to implement their own parser for ESLint and Prettier, but with the Rules API they don't even need to do that, because we can reuse the parser from Volar language server.

So if you write a TS rule, it will be available for TypeScript code in Vue's `<script>` and template's `{{ }}` directly through the Rules API, without the need for extra parsers.

This doesn't mean you need to rewrite all the rules; the Rules API is just an API, not a separate linter, so it is still possible to reuse some rules from ESLint, TSLint, and even Rome.

### Scripts API

For Vue we have `vue-tsc` for checking TS code, and sometimes we also would like to check both CSS and Vue Template code at the same time in CI.

The Scripts API is designed to expose the formatting and linting capabilities of the language server so that they can be used in scripts, allowing you to use it in CI or git pre-commit hooks and get the same results as you would in an IDE.

---

I am very thankful to all the current and past sponsors. On top of hiring me to work full time on Volar for 6 months, Evan You ([@youyuxi](https://twitter.com/youyuxi)) continues to be a gold sponsor. [NuxtLabs](https://nuxtlabs.com/) has also generously extended their Platinum sponsorship. Without their support we wouldn't have shipped Volar 1.0.

And of course, big thanks to [StackBlitz](https://stackblitz.com/) for making it possible for me to work on it full-time.

If you want to support the vision of the Volar.js community, don't hesitate to [become a sponsor](https://github.com/sponsors/johnsoncodehk). I hope in addition to Volar, you can also benefit from Volar.js in the future.

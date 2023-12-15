---
title: 'Vue 2 is Approaching End Of Life'
date: 2023-12-15
author: Evan You
gravatar: eca93da2c67aadafe35d477aa8f454b8
twitter: '@youyuxi'
---

With 2024 almost upon us, we would like to take this opportunity to remind the Vue community that Vue 2 will reach End of Life (EOL) on December 31st, 2023.

Vue 2.0 was released more than 7 years ago in 2016. It was a major milestone in Vue's journey of becoming a mainstream framework. Many current Vue users started using Vue during the Vue 2 era, and many great things have been built with it.

However, active maintenance of two major versions in parallel isn't sustainable for us. As Vue 3 and its ecosystem have matured, it is time for the team to move on and focus our energy on the latest major version.

---

## What Actually Happens on December 31, 2023?

For the past 18 months since [Vue 2.7](https://blog.vuejs.org/posts/vue-2-7-naruto), Vue 2 has received necessary bug and security fixes, but we stopped shipping new features so we can focus our energy on improving Vue 3.

As we approach this date, the Vue community should prepare for the deprecation of Vue 2. On December 31, we will mark the following packages as deprecated on npm:

* All major and minor versions of Vue 2 core
* [vue-router](https://www.npmjs.com/package/vue-router) versions exclusively supporting Vue 2 (3.x and below)
* [vuex](https://www.npmjs.com/package/vuex) versions exclusively supporting Vue 2 (3.x and below)

**After December 31, 2023, Vue 2 will no longer receive new features, updates, or fixes, though it will still be available on all existing distribution channels (CDNs, package managers, Github, etc).**

In other words, your applications will continue to work, but you will get deprecation warnings from your package mananger reminding you that Vue 2 is no longer a supported version.

## What’s Next

Vue 3 has been the default version of Vue since February 7, 2022. Users who have migrated have enjoyed:

* Better performance with a smaller bundle size and faster rendering.
* Enhanced TypeScript support for easier large-scale application development.
* More efficient Proxy-based reactivity system.
* New built-in components like Fragment, Teleport, and Suspense.
* Improved build tooling support and Vue Devtools experience.
* …and more!

When and if you can, consider migrating!

## Still on Vue 2? Here Are Your Options.

Recognizing the various situations that arise during transitions, we are also fully aware that users may need other options until they’re able to migrate, or maybe migration simply isn't a feasible path. Here are some other options to consider.


### Update to the Vue 2 Final Release

The to-be-released EOL version (2.7.16) below will be the final release of Vue 2. The planned released date is **December 23, 2023**. This patch release includes a few final fixes for 2.7 features and improves type alignment with Vue 3. It is currently in beta and we encourage you to try it out and report any possible regressions between this version and 2.7.15.

We strongly encourage you to update to 2.7.16 once it's out. This will be the starting point for extended support mentioned below.

### Purchase Extended Support for Vue 2

If you have to stay on Vue 2 post-EOL, we have partnered with HeroDevs to offer Never-Ending Support (NES). Vue 2 NES provides ongoing updates and security patches for Vue 2 even after EOL so that applications with strict compliance requirements remain secure and compliant. It also guarantees that Vue 2 applications will continue to operate effectively in modern browsers and maintain compatibility with essential libraries like Nuxt, Vuex, and Vuetify 2. Finally, Vue 2 NES has continuous security monitoring and a 14-day SLA for fixes.

Vue 2 NES is the continuation of the support you’ve enjoyed during the Vue 2 LTS period — but indefinitely. For more detailed information, visit the [HeroDevs Vue 2 NES page](https://www.herodevs.com/support/nes-vue?utm_source=vuejs-org&utm_medium=blog&utm_campaign=eol-by-eoy).


### Notify Your Users of your Vue 2 Post-EOL Plan 

If you can’t migrate to Vue 3 or use Vue 2 NES at the moment but still remain on Vue 2, you may need to consider how you will communicate your Vue 2 security plans to your customers.

This does not apply to all Vue users, but many teams are prohibited from shipping _unsupported software_ by SLAs, Contracts & Agreements, or other obligations to downstream parties. These could be with customers, compliance agencies, or even internal company departments. For an increasing number of industries, governing regulatory bodies are also raising expectations on what software creators are accountable for.

If you work with such business requirements, You may need to let your customers, managers, CISO, or other relevant stakeholders, know about your plan to manage support and address any potential CVEs. [Vue 2 hasn’t had major vulnerabilities](https://v2.vuejs.org/lts/#:~:text=For%20the%20record%2C%20Vue%202%20hasn%E2%80%99t%20really%20had%20any%20real%20vulnerabilities%20in%20the%20past%2C%20but%20you%20may%20need%20a%20supported%20version%20to%20fullfil%20regulations%20or%20company%20policies.) in the past, but CVEs do turn up for even the most mature EOL projects — whether directly or via compromised dependencies. Subscribing to CVE notifications through organizations like [OpenCVE](https://www.opencve.io/) and [Snyk](https://snyk.io) can be a good way to find out about vulnerabilities as soon as they’re discovered. Browsers may also ship changes that break legacy libraries - this is rare, but it does happen.

## Looking Forward

It will be an emotional moment for me when Vue 2 finally reaches EOL, but at the same time I am more excited than ever about the future ahead of us. The Vue 3 ecosystem has been thriving with innovation. Vue 3.4 is [currently in beta](https://github.com/vuejs/core/blob/minor/CHANGELOG.md) with performance improvements for both the compiler and runtime. We are also making good progress on [Vapor Mode](https://github.com/vuejs/core-vapor). The end of Vue 2 only marks a new beginning - 2024 will be an exciting year for Vue!

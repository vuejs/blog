<script setup lang="ts">
    import Date from './Date.vue'
    import { data as posts } from './posts.data.js'
    import Tags from './Tags.vue'
    import { useData, useRoute } from 'vitepress'
    import { ref, toRefs, watch } from 'vue'

    const route = useRoute()
    const { frontmatter } = useData()

    // Get path and parse it
    const props = defineProps({
        path: String
    })
    const { path } = toRefs(props)
    const taggedPath = path?.value
    const taggedSlug = taggedPath?.substring(taggedPath.lastIndexOf('/') +1).replace(/\.[^/.]+$/, "")

    // Get tagged posts
    var taggedPosts:any = [];
    for (let post of posts) {
        if (post.tags && post.tags.includes(taggedSlug || "")) {
            taggedPosts.push(post)
        }
    }

    // Update <title>
    if (taggedPosts.length > 0) {
        route.data.title = (taggedSlug || "")
    }
    </script>

    <template>

      <div class="divide-y divide-gray-200">
        <div class="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 class="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 capitalize">
            {{ taggedSlug }}
          </h1>
          <p v-if="taggedPosts.length < 1">There's no posts tagged with '{{ taggedSlug }}'</p>
          <p v-else class="text-lg leading-7 text-gray-500">Shows posts tagged with '{{ taggedSlug }}'</p>
        </div>


        <div v-for="(post,index) in taggedPosts">
          <template v-if="index <= 4">
            <ul>
            <li class="py-12">
            <article class="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
              <Date :date="post.date" />
              <div class="space-y-5 xl:col-span-3">
                <Tags />
                <div class="space-y-6">
                  <h2 class="text-2xl leading-8 font-bold tracking-tight">
                    <a class="text-gray-900" :href="post.href">{{ post.title }}</a>
                  </h2>
                  <div
                    v-if="post.excerpt"
                    class="prose max-w-none text-gray-500"
                    v-html="post.excerpt"
                  ></div>
                </div>
                <div class="text-base leading-6 font-medium">
                  <a class="link" aria-label="read more" :href="post.href"
                    >Read more →</a
                  >
                </div>
              </div>
            </article>
          </li>
          </ul>
        </template>
        </div>

      </div>
    </template>

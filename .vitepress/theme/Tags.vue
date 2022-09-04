<script setup lang="ts">
import { useData } from 'vitepress';
const { frontmatter } = useData()
</script>
<template>
    <ul>
        <li class="md:inline tracking-wide capitalize text-g-900" v-for="(tag, key) in frontmatter.tags">
            <a class="link" :href="'/tags/' + tag">{{ tag }}</a><span v-if="key != frontmatter.tags.length - 1">, </span>
        </li>
    </ul>
</template>

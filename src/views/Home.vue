<template>
  <default-layout>
    <h1>Home</h1>
  </default-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

@Component({
  components: {
    DefaultLayout
  }
})
export default class Home extends Vue {}
</script>

<style></style>

<template>
  <v-app>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class GuestLayout extends Vue {}
</script>

<style></style>

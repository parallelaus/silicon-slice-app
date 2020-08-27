<template>
  <v-footer app>
    <span>
      <slot> &copy; NewCo {{ new Date().getFullYear() }} </slot>
    </span>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Footer extends Vue {}
</script>

<style></style>

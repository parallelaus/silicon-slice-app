<template>
  <v-sheet
    ref="dropZone"
    class="pa-2"
    width="100%"
    style="cursor:pointer; border-color:white; border-style: dashed"
    @click="clickFileUpload"
  >
    <input type="file" style="display: none" />
    <v-row justify="center">
      <v-icon v-if="!dragover" size="75">mdi-cloud-upload-outline</v-icon>
      <v-icon v-if="dragover" color="primary" size="75">mdi-book-plus</v-icon>
    </v-row>
    <v-row justify="center">
      <span class="title">Drag'n drop or click to upload file!</span>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FileDrop extends Vue {
  dragover = false
  clickFileUpload(): void {
    const fileUpload = this.$el.firstElementChild as HTMLElement
    if (fileUpload) fileUpload.click()
  }
}
</script>

<style></style>

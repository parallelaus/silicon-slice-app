<template>
  <v-sheet
    ref="dropZone"
    class="pa-2"
    width="100%"
    style="cursor:pointer; border-color:white; border-style: dashed"
    @click="clickFileUpload"
    @dragenter.prevent="dragover = true"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @drop.prevent="dropFile"
  >
    <input type="file" multiple accept=".csv" style="display: none" />
    <v-row justify="center">
      <v-icon :color="dragover ? 'primary' : ''" size="75">
        mdi-cloud-upload-outline
      </v-icon>
    </v-row>
    <v-row justify="center">
      <span class="title">Drag'n drop or click to upload file!</span>
    </v-row>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class FileDrop extends Vue {
  dragover = false
  fileUpload: HTMLElement | null = null

  mounted() {
    this.fileUpload = this.$el.firstElementChild as HTMLElement

    if (this.fileUpload) {
      this.fileUpload.addEventListener('input', event => {
        const target = event.target as HTMLInputElement
        if (target.files) {
          this.filesSelected(target.files)
        }
      })
    }
  }

  clickFileUpload(): void {
    if (this.fileUpload) this.fileUpload.click()
  }

  dropFile(event: DragEvent): void {
    if (event.dataTransfer) {
      this.filesSelected(event.dataTransfer.files)
    }
  }

  @Emit()
  filesSelected(files: FileList) {
    this.dragover = false
    return files
  }
}

// <!-- accept=".xlsx, .xls, .csv" -- />
</script>

<style></style>

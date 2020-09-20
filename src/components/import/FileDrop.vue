<template>
  <v-sheet
    ref="dropZone"
    width="100%"
    height="400px"
    style="cursor:pointer; border-color:white; border-style: dashed"
    @click="clickFileUpload"
    @dragenter.prevent="dragover = true"
    @dragover.prevent="dragover = true"
    @dragleave.prevent="dragover = false"
    @drop.prevent="dropFile"
  >
    <input type="file" multiple accept=".csv" style="display: none" />
    <div v-if="!loading">
      <v-row justify="center">
        <v-icon :color="dragover ? 'primary' : ''" size="65">
          mdi-cloud-upload-outline
        </v-icon>
      </v-row>
      <v-row justify="center">
        <span class="title text-primary"
          >Drag'n drop or click to upload file!</span
        >
      </v-row>
    </div>
    <div v-if="loading">
      <v-row justify="center">
        <v-progress-circular
          indeterminate
          size="65"
          width="6"
          color="primary"
        />
      </v-row>
    </div>
  </v-sheet>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop } from 'vue-property-decorator'

@Component
export default class FileDrop extends Vue {
  dragover = false
  fileUpload: HTMLElement | null = null

  @Prop({ required: false }) readonly loading!: boolean

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

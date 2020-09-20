<template>
  <default-layout>
    <v-container>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1" :complete="!!inputFileInfo">
            Upload File
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2" :editable="!!inputFileInfo">
            Field Mapping
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="3" :editable="!!inputFileInfo">
            Import Data
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <file-drop :loading="loading" @files-selected="loadFile" />
          </v-stepper-content>
          <v-stepper-content step="2">
            <field-map
              :input-file-info="inputFileInfo"
              :output-schema="schema"
              @change="updateMap"
            />
          </v-stepper-content>
          <v-stepper-content step="3"></v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-container>
  </default-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import FileDrop from '@/components/import/FileDrop.vue'
import FieldMap from '@/components/import/FieldMap.vue'
import schema from '@/components/import/schema'
import { getDataFileInfo } from '@/components/import/import'

@Component({
  components: {
    DefaultLayout,
    FileDrop,
    FieldMap
  }
})
export default class Import extends Vue {
  step = 1
  inputFileInfo: Import.FileInfo | null = null
  schema: Import.OutputSchema | null = null
  loading = false

  async loadFile(files: FileList) {
    try {
      this.loading = true
      const inputFileInfo = await getDataFileInfo(files[0])
      if (inputFileInfo) {
        this.inputFileInfo = inputFileInfo
        this.step = 2
        this.loading = false
        console.log('Input File', inputFileInfo)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async created() {
    this.schema = schema
  }

  updateMap(value: Import.FieldMap) {
    console.log('Field Map', value)
  }
}
</script>

<style></style>

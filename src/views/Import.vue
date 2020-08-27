<template>
  <default-layout>
    <v-stepper>
      <v-stepper-header>
        <v-stepper-step step="1">
          Upload File
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">Name of step 2</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">Name of step 3</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <file-drop />
        </v-stepper-content>

        <v-stepper-content step="2"> </v-stepper-content>

        <v-stepper-content step="3"> </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </default-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import FileDrop from '@/components/import/FileDrop.vue'

@Component({
  components: {
    DefaultLayout,
    FileDrop
  }
})
export default class Import extends Vue {}
</script>

<style></style>

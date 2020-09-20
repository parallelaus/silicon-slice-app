<template>
  <v-row class="ma-0 pa-0">
    <v-col cols="3" class="pa-0">
      <v-select
        :items="inputFieldOptions"
        solo
        :value="inputField.name"
        @change="selectInputField"
      />
    </v-col>
    <v-col cols="1" class="pa-0 text-center">
      <v-icon class="pt-3">mdi-arrow-right-bold-outline</v-icon>
    </v-col>
    <v-col cols="3" class="pa-0">
      <v-card class="pa-3">
        <v-card-text class="pa-0 body-1 font-weight-meduim white--text">
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5" class="py-0 pl-4 pr-0">
      <v-card class="pa-3">
        <v-card-text
          class="pa-0 body-1 font-weight-light text-truncate"
          style="height: 24px"
        >
          <slot name="preview"></slot>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class FieldMapper extends Vue {
  @Prop({ required: true }) readonly inputFieldOptions!: Array<string>
  @Prop({ required: true }) readonly inputField!: Import.Field

  preview!: string | number | boolean

  @Emit('change')
  selectInputField(value: string) {
    return value
  }
}
</script>

<style></style>

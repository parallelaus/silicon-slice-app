<template>
  <v-row class="ma-0 pa-0">
    <v-col cols="3" class="py-0">
      <v-select
        :items="inputFields"
        solo
        :value="field"
        @change="selectInputField"
      >
        ></v-select
      >
    </v-col>
    <v-col cols="1" class="py-0 text-center">
      <v-icon class="pt-3">mdi-arrow-right-bold-outline</v-icon>
    </v-col>
    <v-col cols="3" class="py-0">
      <v-card class="pa-3">
        <v-card-text class="pa-0 body-1 font-weight-meduim white--text">
          <slot></slot>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="5" class="py-0">
      <v-card class="pa-3">
        <v-card-text class="pa-0 body-1">
          <span v-if="!!inputData[field.name]">
            {{ inputData[field.name] }}
          </span>
          <pre v-if="!inputData[field.name]">&nbsp;</pre>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component
export default class FieldMapper extends Vue {
  @Prop({ required: true }) readonly inputFields!: Array<object>
  @Prop({ required: true }) readonly inputData!: Array<
    string | number | boolean
  >
  @Prop({ required: true }) readonly field!: Import.Field

  preview!: string | number | boolean

  @Emit('change')
  selectInputField(value: Import.Field) {
    return value
  }
}
</script>

<style></style>

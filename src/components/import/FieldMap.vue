<template>
  <v-container fluid>
    <v-row>
      <v-col cols="5" offset="7" class="text-center">
        <v-btn :disabled="previewIndex == 0" @click="previewPrev"
          ><v-icon>mdi-menu-left-outline</v-icon>Previous</v-btn
        >
        <v-btn
          :disabled="previewIndex == previewLastIndex"
          class="ml-4"
          @click="previewNext"
          ><v-icon>mdi-menu-right-outline</v-icon>Next</v-btn
        >
      </v-col>
    </v-row>
    <div v-for="(field, fieldKey) in fieldMap" :key="fieldKey">
      <field-mapper
        :input-fields="inputFields"
        :field="field"
        :input-data="inputFileInfo.preview[previewIndex]"
        @change="updateMapField(fieldKey, $event)"
      >
        {{ outputSchema[fieldKey].name }}
      </field-mapper>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import FieldMapper from './FieldMapper.vue'
import { autoMapFields } from './import'

@Component({
  components: {
    FieldMapper
  }
})
export default class FieldMap extends Vue {
  @Prop({ required: true }) readonly outputSchema!: Import.OutputSchema
  @Prop({ required: true }) readonly inputFileInfo!: Import.FileInfo

  inputFields: Array<object> = []
  fieldMap: Import.FieldMap = {}
  previewIndex = 0
  previewLastIndex = 0

  @Watch('inputFileInfo')
  inputFileInfoChange() {
    this.inputFileInfo.fields.forEach(item => {
      this.inputFields.push({
        text: item.name,
        value: item
      })
    })
    this.previewLastIndex = this.inputFileInfo.preview.length - 1
    this.fieldMap = autoMapFields(this.inputFileInfo, this.outputSchema)
    this.change()
  }

  previewPrev() {
    this.previewIndex--
    if (this.previewIndex < 0) this.previewIndex = 0
  }

  previewNext() {
    this.previewIndex++
    if (this.previewIndex > this.previewLastIndex)
      this.previewIndex = this.previewLastIndex
  }

  updateMapField(field: string, value: Import.Field) {
    this.fieldMap[field] = value
    this.change()
  }

  @Emit() change() {
    return this.fieldMap
  }
}
</script>

<style></style>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" class="pa-0">
        <v-select
          v-model="selectedFieldMapId"
          solo
          placeholder="Select existing map or Save new map"
          :items="fieldMaps"
          item-text="name"
          item-value="id"
        />
      </v-col>
      <v-col cols="6" class="pl-2 pt-0">
        <save-field-map-dialog
          :selected-map-name="selectedFieldMap ? selectedFieldMap.name : ''"
          @save="saveFieldMap"
          @newMap="newMap"
        />
        <v-btn color="primary" large dark class="ml-2" @click="newMap">
          New
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <span class="text-h6 font-weight-light">Imported Fields</span>
      </v-col>
      <v-col cols="3" offset="1" class="px-1">
        <span class="text-h6 font-weight-light">Map to</span>
      </v-col>
      <v-col cols="1">
        <span class="text-h6 font-weight-light">Preview</span>
      </v-col>
      <v-col cols="4" class="text-right">
        <v-btn :disabled="previewIndex == 0" @click="previewPrev">
          <v-icon>mdi-menu-left-outline</v-icon>
          Previous
        </v-btn>
        <v-btn
          :disabled="previewIndex == previewLastIndex"
          class="ml-4"
          @click="previewNext"
          ><v-icon>mdi-menu-right-outline</v-icon>Next</v-btn
        >
      </v-col>
    </v-row>
    <div v-for="(inputField, mapKey) in fieldMap" :key="mapKey">
      <field-mapper
        :input-field-options="inputFieldOptions"
        :input-field="inputField"
        @change="updateFieldMap(mapKey, $event)"
      >
        {{ outputSchema[mapKey].name }}
        <div slot="preview">{{ preview(mapKey) }}</div>
      </field-mapper>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import FieldMapper from './FieldMapper.vue'
import SaveFieldMapDialog from './SaveFieldMapDialog.vue'
import { autoMapFields, mapRow } from './import'

@Component({
  components: {
    FieldMapper,
    SaveFieldMapDialog
  }
})
export default class FieldMap extends Vue {
  /**
   * This section deals with creating and updating the current field map
   */
  @Prop({ required: true }) readonly outputSchema!: Import.OutputSchema
  @Prop({ required: true }) readonly inputFileInfo!: Import.FileInfo

  inputFieldOptions: Array<string> = []

  fieldMap: Import.FieldMap = {}

  previewIndex = 0
  previewLastIndex = 0

  @Watch('inputFileInfo')
  inputFileInfoChange() {
    this.inputFileInfo.fields.forEach(item => {
      this.inputFieldOptions.push(item.name)
    })
    this.previewLastIndex = this.inputFileInfo.preview.length - 1
    this.fieldMap = autoMapFields(this.inputFileInfo, this.outputSchema)
    this.change()
  }

  updateFieldMap(field: string, mapTo: string) {
    const inputField = this.inputFileInfo.fields.find(
      item => item.name == mapTo
    )
    if (inputField) {
      this.fieldMap[field] = inputField
      if (inputField.type != this.outputSchema[field].type) {
        this.fieldMap[field].convertTo = this.outputSchema[field].type
      }
      this.change()
    }
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

  preview(key: string): string {
    const row = mapRow(
      this.inputFileInfo.preview[this.previewIndex],
      this.fieldMap
    )
    return row[key]
  }

  /**
   * This sections deals with the saving and loading of
   * field maps.
   *
   */
  selectedFieldMapId: Import.FieldMapId | null = null
  selectedFieldMap: Import.FieldMapItem | null = null

  async created() {
    // Load field maps from storage
    await this.$store.dispatch('fetchFieldMaps')
  }

  newMap() {
    this.selectedFieldMapId = null
  }

  @Watch('selectedFieldMapId')
  selectFieldMap() {
    const selectedFieldMap = this.fieldMaps.find(
      map => map.id == this.selectedFieldMapId
    )
    if (selectedFieldMap) {
      this.selectedFieldMap = selectedFieldMap
      this.fieldMap = selectedFieldMap.fieldMap
    }
    this.change()
  }

  async saveFieldMap(name: string) {
    const mapId = await this.$store.dispatch('saveFieldMap', {
      id: this.selectedFieldMapId,
      name,
      fieldMap: this.fieldMap
    })
    this.selectedFieldMapId = mapId
  }

  get fieldMaps(): Array<Import.FieldMapItem> {
    return this.$store.state.FieldMaps
  }

  @Emit() change() {
    return this.fieldMap
  }
}
</script>

<style></style>

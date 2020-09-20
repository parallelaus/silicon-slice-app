<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary" large dark v-bind="attrs" v-on="on">
        Save
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Save Field Map</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="name"
                label="Field Map Name"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop, Watch } from 'vue-property-decorator'

@Component
export default class SaveFieldMapDialog extends Vue {
  dialog = false
  name = ''

  @Prop({ required: false }) readonly selectedMapName!: string

  @Watch('selectedMapName')
  updateSelectedMapName() {
    this.name = this.selectedMapName
  }

  @Emit() save() {
    this.dialog = false
    return this.name
  }
}
</script>

<style></style>

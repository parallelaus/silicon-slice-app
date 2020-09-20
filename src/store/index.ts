import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/**
 * Map persistence section. This should be replaced with DB storage
 */
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

async function getMaps(): Promise<Import.FieldMapItem[] | undefined> {
  const maps = localStorage.getItem('fieldMaps')
  if (maps) {
    return JSON.parse(maps)
  } else {
    return undefined
  }
}

async function setMap(map: Import.FieldMapItem): Promise<Import.FieldMapId> {
  console.log('Set Map', map)
  if (!map.id) {
    map.id = uuidv4()
  }

  let outMaps = []
  const maps = await getMaps()
  if (maps) {
    const idx = maps.findIndex(item => item.id == map.id)
    if (idx >= 0) {
      // Update existing
      maps[idx] = map
    } else {
      // Add new
      maps.push(map)
    }
    outMaps = maps
  } else {
    // Maps dont exist, create it
    outMaps.push(map)
  }

  localStorage.setItem('fieldMaps', JSON.stringify(outMaps))
  return map.id
}
/*------------------------------------------------------------------*/

export default new Vuex.Store({
  state: {
    FieldMaps: Array<Import.FieldMapItem>()
  },
  mutations: {
    SET_FIELDMAPS(state, maps: Array<Import.FieldMapItem>) {
      state.FieldMaps = maps
    }
  },
  actions: {
    async saveFieldMap(
      { commit },
      map: Import.FieldMapItem
    ): Promise<Import.FieldMapId> {
      // store map in db
      const mapId = await setMap(map)
      // update state
      const maps = await getMaps()
      commit('SET_FIELDMAPS', maps)

      return mapId
    },

    async fetchFieldMaps({ commit }) {
      // load maps from db
      const maps = await getMaps()
      if (maps) {
        // update state
        commit('SET_FIELDMAPS', maps)
      }
    }
  },
  modules: {}
})

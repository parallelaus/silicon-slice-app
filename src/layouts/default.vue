<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-cog</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider />
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application </v-toolbar-title>
      <v-spacer />
      <v-avatar size="38">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          :alt="user.displayName"
        />
      </v-avatar>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <v-footer app>
      <span>&copy; NewCo {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { signOut, currentUser } from '@/firebase/auth'

export default {
  data: () => ({
    drawer: null,
    user: {}
  }),
  async created() {
    this.user = await currentUser()
  },
  methods: {
    async logout() {
      await signOut()
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

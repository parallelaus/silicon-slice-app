<template>
  <v-app id="silicone-slice">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item link exact :to="{ name: 'home' }">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link exact :to="{ name: 'import' }">
          <v-list-item-action>
            <v-icon>mdi-database-import</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Import</v-list-item-title>
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
      <v-toolbar-title>Silicon Slice </v-toolbar-title>
      <v-spacer />
      <v-avatar size="38">
        <img v-if="userPhoto != ''" :src="userPhoto" />
        <v-icon v-if="userPhoto == ''" dark>mdi-account-circle</v-icon>
      </v-avatar>
    </v-app-bar>

    <v-main>
      <slot />
    </v-main>

    <Footer />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Footer from '@/components/app/Footer.vue'
import { signOut, currentUser } from '@/firebase/auth'

@Component({
  components: {
    Footer
  }
})
export default class DefaultLayout extends Vue {
  drawer = null
  user: firebase.User | null = null

  async created(): Promise<void> {
    this.user = await currentUser()
  }

  async logout(): Promise<void> {
    await signOut()
    this.$router.push({
      name: 'login'
    })
  }

  get userPhoto(): string {
    if (this.user && this.user.photoURL) return this.user.photoURL
    return ''
  }
}
</script>

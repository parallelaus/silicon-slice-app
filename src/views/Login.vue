<template>
  <guest-layout>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <login-form v-if="form == 'login'" @login="login" />
          <div v-if="form == 'login'" class="text-center mt-4">
            <v-btn x-small text color="grey darken-2" @click="forgotPassword">
              Forgot Password
            </v-btn>
          </div>
          <forgot-password-form v-if="form != 'login'" @back="form = 'login'" />
          <div class="mt-4 text-center">
            <v-btn @click="googleLogin">Sign In With Google</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </guest-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import GuestLayout from '@/layouts/GuestLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm.vue'
import { signInWithGooglePopup } from '@/firebase/auth'

@Component({
  components: {
    GuestLayout,
    LoginForm,
    ForgotPasswordForm
  }
})
export default class Login extends Vue {
  form = 'login'
  login(): void {
    this.$router.push({
      name: 'home'
    })
  }
  forgotPassword(): void {
    this.form = 'forgot'
  }
  async googleLogin(): Promise<void> {
    try {
      await signInWithGooglePopup()
      this.$router.push({
        name: 'home'
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

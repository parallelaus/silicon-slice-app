<template>
  <layout-guest>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <login-form v-if="form == 'login'" @login="login" />
          <div v-if="form == 'login'" class="text-center mt-4">
            <v-btn x-small text color="grey darken-2" @click="forgotPassword">
              Forgot Password
            </v-btn>
          </div>
          <forgot-password v-if="form != 'login'" @back="form = 'login'" />
          <div class="mt-4 text-center">
            <v-btn @click="googleLogin">Sign In With Google</v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </layout-guest>
</template>

<script>
import LayoutGuest from '../layouts/guest.vue'
import LoginForm from '@/components/auth/loginForm.vue'
import ForgotPassword from '@/components/auth/forgotPasswordForm.vue'
import { signInWithGooglePopup } from '@/firebase/auth'

export default {
  components: {
    LayoutGuest,
    LoginForm,
    ForgotPassword
  },
  data() {
    return {
      form: 'login'
    }
  },
  methods: {
    login() {
      this.$router.push({
        name: 'home'
      })
    },
    forgotPassword() {
      this.form = 'forgot'
    },
    async googleLogin() {
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
}
</script>

<style></style>

<template>
  <v-card class="elevation-12">
    <v-card-title>
      <v-spacer></v-spacer>
      <span class="subtitle-1 red--text text--lighten-2">
        {{ errorMessage }}
      </span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="form.email"
          label="Email"
          :rules="usernameRules"
          name="email"
          prepend-icon="mdi-account"
          type="text"
        />

        <v-text-field
          id="password"
          v-model="form.password"
          label="Password"
          :rules="passwordRules"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        text
        color="primary"
        :loading="loading"
        :disabled="!valid"
        @click="login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { signInWithEmailAndPassword } from '@/firebase/auth'

@Component
export default class LoginForm extends Vue {
  loading = false
  valid = true
  errorMessage = ''
  form = {
    email: '',
    password: ''
  }

  usernameRules = [
    (v: boolean | string) => !!v || 'Please enter your email is required',
    (v: boolean | string) =>
      /.+@.+\..+/.test(v as string) || 'Email must be valid'
  ]

  passwordRules = [(v: boolean | string) => !!v || 'Please enter your password']

  async login(): Promise<void> {
    this.loading = true
    this.errorMessage = ''

    try {
      await signInWithEmailAndPassword(this.form)
      this.$emit('login')
    } catch (error) {
      if (error.error == 'account-disabled') {
        this.errorMessage =
          'Your account has been disabled. Please contact accounts.'
      } else {
        this.errorMessage = 'Email and/or Password incorrect. Please try again.'
        // this.$refs.form.reset()
      }
    }

    this.loading = false
  }
}
</script>

<style></style>

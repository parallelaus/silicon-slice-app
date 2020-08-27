<template>
  <v-card class="elevation-12">
    <v-card-title>
      <v-spacer></v-spacer>
      <span class="subtitle-1 primary--text text--lighten-2">
        {{ message }}
      </span>
      <v-spacer></v-spacer>
    </v-card-title>
    <v-card-text v-if="message == ''">
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="form.email"
          label="Email"
          :rules="usernameRules"
          name="email"
          prepend-icon="mdi-account"
          type="text"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="primary" @click="back">
        Back to Login
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="message == ''"
        text
        color="primary"
        :loading="loading"
        :disabled="!valid"
        @click="reset"
      >
        Reset Password
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { sendPasswordResetEmail } from '@/firebase/auth'

@Component
export default class ForgotPasswordForm extends Vue {
  loading = false
  valid = true
  message = ''
  form = {
    email: ''
  }
  usernameRules = [
    (v: boolean | string) => !!v || 'Please enter your email is required',
    (v: boolean | string) =>
      /.+@.+\..+/.test(v as string) || 'Email must be valid'
  ]

  async reset(): Promise<void> {
    this.loading = true
    try {
      await sendPasswordResetEmail(this.form.email)
    } catch (error) {
      console.log(error.code)
    }
    this.message = 'Please check your email for further instruction.'
    this.loading = false
  }

  back(): void {
    this.$emit('back')
  }
}
</script>

<style></style>

<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Envoyer le QR code par mail</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('close', null)"
        >
          Fermer
        </v-btn>
        <v-btn
          color="blue darken-1"
          text
          @click="$emit('close', email)"
        >
          Envoyer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "QRSendForm",
  props: ["dialog"],
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || 'L\'email est requis',
        v => /.+@.+/.test(v) || 'L\'email doit être valide',
      ],
    }
  }
}
</script>

<style scoped>

</style>

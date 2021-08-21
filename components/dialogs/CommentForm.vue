<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title>
        <span class="text-h5">Poster un commentaire</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <v-textarea
                label="Commentaire"
                v-model="message"
                required
              ></v-textarea>
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
          @click="$emit('close', message)"
        >
          Poster
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog"],
  data() {
    return {
      message: ''
    }
  },
  unmounted() {
    this.message = '';
  },
  name: "CommentForm"
}
</script>

<style scoped>

</style>

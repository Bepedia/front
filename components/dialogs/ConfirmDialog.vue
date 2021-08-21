<template>
  <v-dialog
    v-model="dialog"
    persistent
  >
    <v-card>
      <v-card-title class="text-h5">
        {{title}}
      </v-card-title>
      <v-card-text>
        {{message}}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          text
          @click="$emit('close')"
        >
          Annuler
        </v-btn>
        <v-btn
          color="green darken-1"
          text
          @click="$emit('close', true)"
        >
          Confirmer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["dialog", "message", "title"],
  name: "ConfirmDialog"
}
</script>

<style scoped>

</style>

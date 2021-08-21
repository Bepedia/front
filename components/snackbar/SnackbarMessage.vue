<template>
  <v-snackbar
    v-model="snackbar"
  >
    {{ text }}

    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="$emit('close')"
      >
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackbarMessage",
  props: ["snackbar", "text"]
}
</script>

<style scoped>

</style>

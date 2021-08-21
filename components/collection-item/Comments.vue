<template>
  <v-list
    subheader
    three-line
  >
    <p v-if="comments.length === 0">
      Pas de commentaire
    </p>

    <v-list-item
      v-for="(comment, index) in comments"
      :key="index"
    >
<!--

      <v-list-item-avatar>
        <v-icon
          class="grey lighten-1"
          dark
        >
          mdi-folder
        </v-icon>
      </v-list-item-avatar>
-->

      <v-list-item-content>
        <v-list-item-title v-text="comment.message"></v-list-item-title>

        <v-list-item-subtitle v-text="getDate(comment.creation_date)"></v-list-item-subtitle>
        <v-list-item-subtitle v-text="comment.author"></v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-action>
        <v-btn icon @click="$emit('delete', comment.id)">
          <v-icon color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>

  </v-list>
</template>

<script>
export default {
  name: "Comments",
  props: ["comments"],
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    getDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <v-list-item>
    <v-list-item-avatar>
      <v-icon
        class="grey lighten-1"
        dark
      >
        mdi-archive-minus-outline
      </v-icon>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title @click="moveToCarton(item)" v-text="item.name"></v-list-item-title>

      <v-list-item-subtitle @click="moveToCarton(item)" v-text="item.nbItems + ' objet(s)'"></v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="moveToCarton(item)">
        <v-icon color="grey lighten-1">mdi-information-outline</v-icon>
      </v-btn>
      <v-btn icon @click="confirmDialog = true">
        <v-icon color="grey lighten-1">mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>

    <ConfirmDialog :dialog="confirmDialog"
                   @close="deleteComment"
                   message="Es-tu sûr(e) de vouloir supprimer ce carton ?"
                   title="Supprimer carton"/>

  </v-list-item>
</template>

<script>
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";

export default {
  name: "CartonItem",
  props: ['item'],
  components: {
    ConfirmDialog
  },
  data() {
    return {
      confirmDialog: false
    }
  },
  methods: {
    moveToCarton(item) {
      this.$router.push(`/cartons/${item.id}`);
    },
    deleteComment(confirm) {
      if (!confirm) {
        return;
      }
      this.confirmDialog = false;
      this.$emit('delete', this.item.id);
    }
  }
}
</script>

<style scoped>

</style>

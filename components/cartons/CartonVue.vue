<template>
  <v-card
    class="mx-auto card"
  >

    <v-list-item two-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          {{ item.name }}
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{item.nbItems}} objet(s)
        </v-list-item-title>
      </v-list-item-content>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="white"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item :to="`/cartons/${item.id}/edit`">
            <v-list-item-title>Modifier</v-list-item-title>
          </v-list-item>
          <v-list-item @click="deleteDialog = true">
            <v-list-item-title>Supprimer</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="$emit('sendQr')">Envoyer le QR code</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-list-item>


    <v-card-text>

      <v-list disabled>
        <v-subheader>Contenu</v-subheader>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in item.items"
            :key="i"
          >
            <v-list-item-icon>
              <v-icon>mdi-book</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.label"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-card-text>

    <ConfirmDialog :dialog="deleteDialog"
                   @close="deletePost($event)"
                   message="Es-tu sûr(e) de vouloir supprimer ce post ?"
                   title="Supprimer post"/>

  </v-card>
</template>

<script>
import ConfirmDialog from "@/components/dialogs/ConfirmDialog";
import QRSendForm from "@/components/dialogs/QRSendForm";

export default {
  name: "CartonVue",
  props: ['item'],
  components: {
    ConfirmDialog,
    QRSendForm
  },
  data() {
    return {
      deleteDialog: false,
    }
  },
  methods: {
    deletePost(confirm) {
      this.deleteDialog = false;
      if (confirm) {
        this.loading = true;
        this.$store.dispatch("collection/deletePost", {
          ...this.$route.params,
          collection: 'carton'
        }).then(() => {
          this.$router.push(`/cartons`);
        });
      }
    },
  }
}
</script>

<style scoped>

.card {
  margin-bottom: 64px;
}

.titles {
  display: flex;
  flex-direction: column;
}

.title-header {
  display: flex;
  width: 100%;
  flex-direction: row;
}

</style>

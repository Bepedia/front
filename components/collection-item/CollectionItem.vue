<template>
  <div>

    <v-progress-linear
      v-if="loading"
      indeterminate
    ></v-progress-linear>

    <v-card
      v-if="!loading"
      class="mx-auto my-12"
    >

      <v-img
        :src="item.img_url"
        eager
        gradient="rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)"
      >
        <v-app-bar
          flat
          color="rgba(0, 0, 0, 0)"
        >
          <v-toolbar-title>{{ item.title }}</v-toolbar-title>

          <v-spacer></v-spacer>

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
              <v-list-item :to="`/${collection}/${item.id}/edit`">
                <v-list-item-title>Modifier</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteDialog = true">
                <v-list-item-title>Supprimer</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>
      </v-img>

      <v-card-text>

        <div class="item-description">
          {{ item.description }}
        </div>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-title>Commentaires</v-card-title>

      <v-card-text>

        <v-progress-linear
          v-if="commentLoading"
          indeterminate
        ></v-progress-linear>

        <Comments @delete="commentToDelete = $event; confirmDialog = true;"
                  :comments="item.comments"/>

      </v-card-text>

      <v-card-actions>
        <v-btn
          color="deep-purple lighten-2"
          text
          @click="dialog = true"
        >
          Commenter
        </v-btn>
      </v-card-actions>
    </v-card>

    <CommentForm @close="comment($event)" :dialog="dialog"/>

    <SnackbarMessage @close="commentCreated = false"
                     :snackbar="commentCreated"
                     text="Commentaire créé"/>

    <SnackbarMessage @close="commentDeleted = false"
                     :snackbar="commentDeleted"
                     text="Commentaire supprimé"/>

    <ConfirmDialog :dialog="confirmDialog"
                   @close="deleteComment($event)"
                   message="Es-tu sûr(e) de vouloir supprimer ce commentaire ?"
                   title="Supprimer commentaire"/>

    <ConfirmDialog :dialog="deleteDialog"
                   @close="deletePost($event)"
                   message="Es-tu sûr(e) de vouloir supprimer ce post ?"
                   title="Supprimer post"/>

  </div>
</template>

<script>
import Comments from "~/components/collection-item/Comments";
import CommentForm from "~/components/dialogs/CommentForm";
import {mapState} from "vuex";
import ConfirmDialog from "~/components/dialogs/ConfirmDialog";

export default {
  name: "CollectionItem",
  components: {
    Comments,
    CommentForm,
    ConfirmDialog
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.currentUser
    })
  },
  mounted() {
    this.collection = this.$route.params.collection;
    this.$store.dispatch("collection/getItem", this.$route.params).then((res) => {
      this.loading = false;
      this.item = res.data;
    })
  },
  data() {
    return {
      loading: true,
      commentLoading: false,
      collection: null,
      item: null,
      dialog: false,
      commentCreated: false,
      commentDeleted: false,
      confirmDialog: false,
      deleteDialog: false,
      postDeleted: false,
      commentToDelete: null
    }
  },
  methods: {
    deleteComment(confirm) {
      this.confirmDialog = false;
      if (confirm) {
        this.commentLoading = true;
        this.$store.dispatch("collection/deleteComment", {
          ...this.$route.params,
          commentId: this.commentToDelete
        }).then(res => {
          this.item = res.data;
          this.commentDeleted = true;
          this.commentToDelete = null;
          this.commentLoading = false;
        })
      }
    },
    deletePost(confirm) {
      this.deleteDialog = false;
      if (confirm) {
        this.loading = true;
        this.$store.dispatch("collection/deletePost", this.$route.params).then(() => {
          this.postDeleted = true;
          setTimeout(() => this.postDeleted = false, 2000);
          this.$router.push(`/${this.$route.params.collection}`);
        });
      }
    },
    comment(message) {
      this.dialog = false;
      if (message) {
        this.commentLoading = true;
        this.$store.dispatch("collection/comment", {
          ...this.$route.params,
          message
        }).then(res => {
          this.commentLoading = false;
          this.item = res.data;
          this.commentCreated = true;
          setTimeout(() => this.commentCreated = false, 2000);
        });
      }
    }
  }
}
</script>

<style scoped>

.item-description {
  white-space: break-spaces;
}

</style>

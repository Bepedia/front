<template>

  <div>

    <v-progress-linear
      v-if="loading"
      indeterminate
    ></v-progress-linear>


    <v-card
      class="mx-auto my-12"
    >
      <div>
        <h2 v-if="!model.id">Créer {{ collection }}</h2>
        <h2 v-if="model.id">Mettre à jour {{ collection }}</h2>
      </div>

      <v-img
        :src="model.img_url"
        eager
        gradient="rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.3)">
      </v-img>

      <v-card-text>

        <div>
          <v-toolbar-title class="title-container">
            <v-text-field label="Titre" v-model="model.title"></v-text-field>
          </v-toolbar-title>
        </div>

        <div>
          <v-textarea
            label="Description"
            v-model="model.description"
            required
          ></v-textarea>
        </div>

        <div>
          <v-file-input
            label="Ajouter une photo"
            v-model="model.img"
            accept="image/*" capture="camera"
            prepend-icon="mdi-camera"
          ></v-file-input>
        </div>

      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="deep-purple lighten-2"
          text
          v-if="!model.id && !loading"
          @click="create"
        >
          Sauvegarder
        </v-btn>
        <v-btn
          color="deep-purple lighten-2"
          text
          v-if="model.id && !loading"
          @click="update"
        >
          Sauvegarder
        </v-btn>
        <v-progress-circular
          indeterminate
          v-if="loading"
          color="primary"
        ></v-progress-circular>
      </v-card-actions>
    </v-card>


    <SnackbarMessage @close="postCreated = false"
                     :snackbar="postCreated"
                     text="Post créé"/>

  </div>

</template>

<script>
export default {
  name: "CollectionItemForm",
  data() {
    return {
      loading: false,
      postCreated: false,
      collection: null,
      model: {
        title: '',
        description: '',
        img_url: '',
        img: null
      }
    }
  },
  mounted() {
    this.collection = this.$route.params.collection;
    if (this.$route.params.id) {
      this.loading = true;
      this.$store.dispatch('collection/getItem', this.$route.params).then(res => {
        this.loading = false;
        this.model = {
          ...this.model,
          ...res.data
        };
      });
    }
  },
  methods: {
    async update() {
      this.loading = true;
      if (this.model.img) {
        await this.$store.dispatch('collection/addImg', {
          ...this.$route.params,
          id: this.model.id,
          file: this.model.img
        });
      }
      setTimeout(async () => {
        await this.$store.dispatch("collection/updatePost", {
          ...this.$route.params,
          body: {
            title: this.model.title,
            description: this.model.description
          }
        });
        await this.$router.push(`/${this.collection}/${this.model.id}`);
      }, 1500);
    },
    create() {
      this.loading = true;
      this.$store.dispatch("collection/createPost", {
        ...this.$route.params,
        body: {
          title: this.model.title,
          description: this.model.description,
        }
      }).then(async res => {
        if (this.model.img) {
          await this.$store.dispatch('collection/addImg', {
            ...this.$route.params,
            id: res.data.id,
            file: this.model.img
          });
        }
        this.postCreated = true;
        setTimeout(() => {
          this.postCreated = false;
        }, 2000);
        this.$router.push(`/${this.collection}`);
      })
    }
  }
}
</script>

<style scoped>

.title-container {
  width: 100%;
}

h2 {
  padding: 15px;
}

</style>

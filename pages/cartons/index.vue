<template>

  <div class="card-container">

    <div class="add-button-container">
      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
        to="/cartons/new"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>

    <v-card
      :loading="loading"
      class="mx-auto my-12 card"
      max-width="374"
    >
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-card-title>Cartons</v-card-title>

      <v-list two-line>
        <CartonItem v-for="(item, idx) in cartons" @delete="deleteCarton" :key="idx" :item="item" />
      </v-list>

    </v-card>

    <SnackbarMessage @close="deleted = false"
                     :snackbar="deleted"
                     text="Carton supprimé"/>
  </div>

</template>

<script>
import CartonItem from "@/components/cartons/CartonItem";

export default {
  name: "index",
  components: {
    CartonItem,
  },
  data() {
    return {
      loading: true,
      deleted: false,
      cartons: []
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    deleteCarton(id) {
      this.$store.dispatch('collection/deletePost', {
        collection: 'carton',
        id
      }).then(() => {
        this.deleted = true;
        setTimeout(() => {
          this.deleted = false;
        }, 2000);
        this.load();
      })
    },
    load() {
      this.loading = true;
      this.$store.dispatch('collection/listCollection', 'carton').then(res => {
        this.cartons = res.data;
        this.loading = false;
      })
    }
  }
}
</script>

<style scoped>

.add-button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.card {
  margin-top: 16px !important;
  margin-bottom: 64px !important;
}

</style>

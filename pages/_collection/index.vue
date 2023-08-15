<template>

  <div class="main-container">
    <v-progress-linear
      v-if="loading"
      indeterminate
    ></v-progress-linear>

    <div class="collection-header">
      <h1>{{currentRoute}}</h1>

      <v-btn
        class="mx-2"
        fab
        dark
        small
        color="primary"
        :to="`/${collection}/create`"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </div>


    <v-list three-line>
      <template v-for="(item, index) in items">

        <v-list-item
          :key="index"
          :to="`/${collection}/${item.id}`"
        >
          <v-list-item-avatar>
            <v-img :src="item.img_url"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.author"></v-list-item-subtitle>
            <v-list-item-subtitle v-html="getDate(item.creation_date)"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

  </div>

</template>

<script>
export default {
  mounted() {
    this.collection = this.$route.params.collection;
    this.$store.dispatch("collection/listCollection", this.$route.params.collection).then((res) => {
      this.currentRoute = this.$route.params.collection;
      this.loading = false;
      this.items = res.data.sort((a, b) => {
        return new Date(b.creation_date) - new Date(a.creation_date);
      });
    })
  },
  methods: {
    getDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  },
  data: () => {
    return {
      loading: true,
      currentRoute: '',
      collection: '',
      items: []
    }
  }
}
</script>

<style scoped>

h1 {
  text-transform: capitalize;
}

.main-container {
  z-index: 1;
  padding-bottom: 90px;
  width: 100%;
}

.collection-header {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>

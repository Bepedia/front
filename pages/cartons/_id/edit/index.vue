<template>
  <div>
    <v-progress-linear
      indeterminate
      v-if="loading"
    ></v-progress-linear>

    <CartonForm v-if="item" @save="update" :update-item="item" />
  </div>
</template>

<script>
import CartonForm from "@/components/cartons/CartonForm";

export default {
  name: "index",
  components: {
    CartonForm
  },
  data() {
    return {
      loading: true,
      item: null
    }
  },
  methods: {
    update(model) {
      const body = {...model};
      delete body['id'];
      this.$store.dispatch("collection/updatePost", {
        id: this.item.id,
        collection: 'carton',
        body
      }).then(() => {
        this.$router.push(`/cartons/${this.item.id}`);
      });
    }
  },
  mounted() {
    this.$store.dispatch('collection/getItem', {
      collection: 'carton',
      id: this.$route.params.id
    }).then(res => {
      this.item = res.data;
      this.loading = false;
    })
  }
}
</script>

<style scoped>

</style>

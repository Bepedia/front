<template>

  <div class="form-container">
    <CartonForm @save="create" />
  </div>

</template>

<script>
import CartonForm from "@/components/cartons/CartonForm";

export default {
  name: "index",
  components: {
    CartonForm
  },
  methods: {
    create(body) {
      this.$store.dispatch('collection/createPost', {
        collection: 'carton',
        body
      }).then(() => {
        this.$router.push('/cartons');
      });
    }
  }
}
</script>

<style scoped>

.form-container {
  padding: 30px 0;
}

</style>

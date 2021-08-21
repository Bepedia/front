<template>
  <CollectionItemForm />
</template>

<script>
export default {
  name: "index",
  mounted() {
    console.log('route', this.$route.params);
  }
}
</script>

<style scoped>

</style>

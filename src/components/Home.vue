<template>
  <v-container class="sub-container">
    <v-card>
      <Calendar/>
    </v-card>
  </v-container>
</template>

<script>
  import Calendar from "./calendar/Calendar";

  export default {
    name: 'App',
    components: {
      Calendar,
    },
  }
</script>

<style>
  .sub-container {
    background-color: lightgray;
    height: 90%;
  }
</style>

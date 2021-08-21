<template>

  <div>

    <v-row class="header">

      <v-col cols="3" class="button-container">
<!--        <v-btn
          class="mx-2"
          fab
          dark
          small
          @click="triggerDrawer"
        >
          <v-icon dark>
            mdi-menu
          </v-icon>
        </v-btn>-->
      </v-col>

      <v-col cols="6" class="title-container">
        <h1>Bepedia</h1>
      </v-col>

      <v-col cols="3"></v-col>

    </v-row>

    <NavDrawer />

  </div>


</template>

<script>
import NavDrawer from "~/components/homepage/NavDrawer";
import {mapState} from "vuex";

export default {
  name: "CustomHeader",
  components: {
    NavDrawer
  },
  computed: {
    ...mapState({
      drawer: state => state.drawer.drawer
    })
  },
  methods: {
    triggerDrawer: function () {
      this.$store.commit('drawer/setDrawer', !this.drawer)
    }
  }
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Style+Script&display=swap');

.button-container, .title-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title-container {
  font-family: 'Style Script', cursive;
}

</style>

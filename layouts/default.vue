<template>
  <v-app dark>
    <v-main class="main">
      <CustomHeader class="header" />

      <v-container>
        <Nuxt />
      </v-container>

      <CustomFooter class="footer"/>
    </v-main>

  </v-app>
</template>

<script>
import {mapState} from "vuex";
import CustomHeader from "~/components/CustomHeader";
import CustomFooter from "~/components/CustomFooter";

export default {
  components: {
    CustomHeader,
    CustomFooter
  },
  computed: {
    currentPath() {
      return this.$nuxt.$route.path;
    },
    ...mapState({
      classes: state => state.backgroundClasses.classes
    })
  },
  data () {
    return {
      drawer: false,
      fixed: false,
    }
  },
  mounted() {
    this.$store.dispatch('user/fetchUser').then(user => {
      this.$store.commit('user/setUser', user.data);
    });
  }
}
</script>

<style>

.header {
  width: 100%;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}

.main {
  display: flex;
  flex-direction: column;
  
}

</style>

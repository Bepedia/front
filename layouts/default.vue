<template>
  <v-app dark>
    <v-main :class="classes" class="main">
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
  position: fixed;
  top: 15px;
  left: 0;
  width: 100%;
  z-index: 0;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}

.main {
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-attachment: fixed !important;
}

.collection {
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ), url("/collection-background.jpeg");
}

.item {
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ), url("/collection-item-background.jpeg");
}

.homepage {
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ), url("/homepage-background.jpeg");
}

.nendoroids {
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ), url("/nendoroids-background.jpeg");
}

.cartons {
  background: linear-gradient(
    rgba(0, 0, 0, 0.7),
    rgba(0, 0, 0, 0.7)
  ), url("/cartons-background.jpeg");
}
</style>

<template>

  <footer v-if="$route.path !== '/'" id="footer">

    <v-col cols="4"
           class="icon"
           :class="{'selected': $route.path.includes(i.link) && !['/', ''].includes(i.link)}"
           :id="i.link"
           v-for="(i, index) in routes"
           @click="navigate(i.link)"
           :key="index">
      <img :src="i.icon" alt="nav icon"/>
    </v-col>

  </footer>

</template>

<script>
import {mapState} from "vuex";

export default {
  name: "CustomFooter",
  methods: {
    navigate(url) {
      return this.$router.push(url);
    },
    moveHeader(path) {
      if (!this.routes.map(r => r.link).includes(path)) {
        return;
      }
      setTimeout(() => {
        const element = document.getElementById(path);
        if (!element) {
          return;
        }
        const position = element.getBoundingClientRect();
        document.getElementById("footer").scrollTo({
          top: position.top,
          left: position.left,
          behavior: "smooth"
        });
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.moveHeader(this.currentRoute);
    }, 500);
  },
  computed: {
    ...mapState({
      currentRoute: state => state.pageHandler.currentRoute,
      routes: state => state.pageHandler.menuItems
    })
  },
  watch: {
    currentRoute(value) {
      this.moveHeader(value);
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style scoped>

footer {
  width: 100%;
  height: 64px;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  overflow-x: auto;
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.icon.selected {
  background-color: #0076d9;
}

.icon img {
  height: 75%;
}

</style>

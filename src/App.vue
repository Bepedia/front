<template>
  <v-app id="main">
    <div class="ma-12 pa-12">
      <v-card class="main-card">
        <SideBar :user="user"/>
        <v-main class="main-container">
          <div class="main-title">
            <h1> {{ title }}</h1>
          </div>
          <Home/>
        </v-main>
      </v-card>
    </div>
  </v-app>
</template>

<script>
import Home from './components/Home';
import {getMe} from "./services/api.service";
import interceptorSetup from "./services/interceptor";
import SideBar from "./components/SideBar";

interceptorSetup();


export default {
  name: 'App',
  components: {
    SideBar,
    Home,
  },
  mounted() {
    const qTab = [];
    qTab.push(new Promise(resolve => {
      getMe().then(res => {
        this.$store.commit('setUser', res.data);
        this.user = res.data;
        console.log(this.user)
        resolve();
      });
    }));

    Promise.all(qTab).then(() => {
      this.$store.commit('setLoading', false);
    });
    if (this.$router.currentRoute.path === '/') {
      this.title = 'Accueil';
    }
  },
  data: () => ({
    user: '',
    title: ''
  }),
};

</script>
<style>
  #main {
    background-color: aliceblue;
  }

  .main-card {
    display: flex!important;
    justify-content: flex-end;
    min-height: 75vh;
  }

  .main-container {
    max-width: 95% !important;
  }

  h1 {
    padding: 10px;
  }
</style>

<template>

  <div class="main">

    <div class="list-container">

      <v-chip dark>Menu</v-chip>

      <div class="items">
        <NuxtLink v-for="i in menuItems" :to="i.link" :key="i.link">
          <MenuItem class="item" :item="i"></MenuItem>
        </NuxtLink>
      </div>

    </div>

  </div>

</template>

<script>
import MenuItem from "~/components/homepage/MenuItem";
import {mapState} from "vuex";

export default {
  components: {
    MenuItem
  },
  computed: {
    ...mapState({
      menuItems: state => state.pageHandler.menuItems.filter(i => i.link !== '/')
    })
  },
  data: () => {
    return {
    }
  }
}
</script>

<style scoped>

.list-container {
  display: flex;
  flex-direction: column;
}

.item {
  margin: 10px 20px;
  align-items: stretch;
}


</style>

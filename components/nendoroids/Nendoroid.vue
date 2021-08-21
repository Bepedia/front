<template>
  <div class="nendoroid" :id="item.id">

    <div class="nendoroid-header">

      <v-btn
        icon
        @click="moveToLink(item.link)"
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>

      <v-btn
        icon
        color="pink"
        @click="item.owned = !item.owned; $emit('ownedChanged', item)"
      >
        <v-icon>{{ item.owned ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-btn>

    </div>

    <v-spacer></v-spacer>

    <div class="text">
      #{{ item.id }} {{ item.name }}
    </div>

  </div>
</template>

<script>
export default {
  props: ['item'],
  name: "Nendoroid",
  methods: {
    moveToLink(url) {
      window.open(url, '_blank');
    }
  },
  mounted() {
    const element = document.getElementById(this.item.id);
    if (element) {
      element.style.backgroundImage = `linear-gradient(
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.5)
  ), url(${this.item.img})`;
    }
  }
}
</script>

<style scoped>

.nendoroid {
  display: flex;
  flex-direction: column;
  /*height: 30vh;*/
  height: 223px;
  background-size: contain;
  border-radius: 10px;
}

.text {
  padding: 10px;
  background-color: rgba(0, 118, 217, 0.5);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.nendoroid-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>

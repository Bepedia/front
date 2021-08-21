<template>

  <v-row class="item">

    <v-col cols="4" class="img-container">

      <img :src="item.img" :alt="'img for ' + item.title"/>

    </v-col>

    <v-col cols="8" class="text-container">

      <b>{{item.title}}</b>
      <span>{{item.subtitle}}</span>

    </v-col>

  </v-row>

</template>

<script>
export default {
  name: "MenuItem",
  props: [
    'item'
  ]
}
</script>

<style scoped>

.img-container {
  padding: 0;
}

img {
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
}

.item {
  background-color: rgba(144, 202, 249, 0.4);
  border-radius: 10px;
}

.text-container {
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

span {
  font-size: 75%;
}

b, span {
  color: white;
  text-decoration: none;
}

</style>

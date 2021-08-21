<template>

  <div class="row-container">

    <Nendoroid @ownedChanged="$emit('ownedChanged', $event)"
               v-for="(item, idx) in items"
               :key="idx"
               :item="item"
               class="nendoroid" />

  </div>

</template>

<script>
import Nendoroid from "~/components/nendoroids/Nendoroid";

export default {
  name: "NendoroidRow",
  components: {
    Nendoroid
  },
  props: ["items"]
}
</script>

<style scoped>

.row-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.nendoroid {
  width: 45%;
  margin: 10px;
}

</style>

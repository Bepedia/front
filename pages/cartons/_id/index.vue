<template>
  <div>
    <v-progress-linear
      indeterminate
      v-if="loading"
    ></v-progress-linear>

    <CartonVue v-if="item" :item="item" @sendQr="sendEmailDialog = true" />

    <QRSendForm :dialog="sendEmailDialog" @close="sendEmail" />

    <SnackbarMessage @close="mailSent = false"
                     :snackbar="mailSent"
                     text="Mail envoyé"/>
  </div>
</template>

<script>
import CartonVue from "@/components/cartons/CartonVue";
import QRSendForm from "@/components/dialogs/QRSendForm";

export default {
  name: "index",
  components: {
    CartonVue,
    QRSendForm
  },
  data() {
    return {
      loading: true,
      item: null,
      sendEmailDialog: false,
      mailSent: false
    }
  },
  methods: {
    sendEmail(email) {
      this.sendEmailDialog = false;
      if (!email) {
        return;
      }
      this.loading = true;
      this.$store.dispatch('cartons/sendQrCodeEmail', {
        id: this.item.id,
        email
      }).then(() => {
        this.loading = false;
        this.mailSent = true;
        setTimeout(() => {
          this.mailSent = false;
        }, 2000);
      })
    },
  },
  mounted() {
    this.$store.dispatch('collection/getItem', {
      collection: 'carton',
      id: this.$route.params.id
    }).then(res => {
      this.item = res.data;
      this.loading = false;
    })
  }
}
</script>

<style scoped>

</style>

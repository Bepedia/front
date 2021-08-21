export const actions = {
  sendQrCodeEmail(state, body) {
    return this.$axios.post(`/carton/${body.id}/qr`, {
      to: body.email
    })
  }
}

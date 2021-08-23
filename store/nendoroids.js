
export const actions = {
  getNendoroids(state, search) {
    let url = '/nendoroids';
    const params = Object.keys(search).map(s => `${s}=${search[s]}`).join('&');
    if (params.length > 0) {
      url += `?${params}`;
    }
    return this.$axios.get(url);
  },
  updateNendoroid(state, nendoroid) {
    return this.$axios.patch(`/nendoroids/${nendoroid.id}`, nendoroid);
  },
  getStats(state) {
    return this.$axios.get('/nendoroids/stats')
  }
};

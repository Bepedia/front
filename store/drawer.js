export const state = () => ({
  drawer: false
})

export const mutations = {
  setDrawer(state, value) {
    state.drawer = value;
  }
}

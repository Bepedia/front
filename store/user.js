export const state = () => {
  return {
    currentUser: null
  }
}

export const mutations = {
  setUser(state, user) {
    state.currentUser = user;
  }
}

export const actions = {

  fetchUser(state) {
    return this.$axios.get('/user/me');
  }

}

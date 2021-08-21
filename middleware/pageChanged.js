export default function ({ store, route }) {
  store.commit("pageHandler/setCurrentRoute", route.fullPath);
}


export default function ({ $axios }) {
  $axios.defaults.baseURL = process.env.VUE_APP_API_URL;
}

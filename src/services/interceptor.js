import axios from 'axios';

export default function interceptorSetup() {
    axios.interceptors.request.use(function (config) {
        if (process.env.VUE_APP_NODE_ENV !== "production") {
            config.headers['X-Goog-Authenticated-User-Email'] = process.env.VUE_APP_GOOGLE_LOCAL_USER;
        }
        config.url = process.env.VUE_APP_ROOT_API + config.url;
        return config;
    }, function (err) {
        return Promise.reject(err);
    });
}

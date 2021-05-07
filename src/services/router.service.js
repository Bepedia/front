import VueRouter from "vue-router";
import Vue  from "vue";
import Home from "../components/Home";

export const createRouter = () => {
    Vue.use(VueRouter);
    const routes = [
        {path: '/', component: Home},
    ];

    return new VueRouter({
        routes
    });
}

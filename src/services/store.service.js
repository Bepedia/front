import Vuex from "vuex";
import Vue from "vue";

export const createStore = () => {
    Vue.use(Vuex);
    return new Vuex.Store({
        state: () => {
            return {
                user: null,
                loading: true,
                showNavigation: false
            }
        },
        getters: {
            showNavigation: state => state.showNavigation
        },
        mutations: {
            setUser(state, user) {
                state.user = user;
            },
            setLoading(state, loading) {
                state.loading = loading;
            },
            toggleSidenav(state) {
                state.showNavigation = !state.showNavigation;
            },
            setShowNavigation(state, showNavigation) {
                state.showNavigation = showNavigation;
            }
        }
    });
}


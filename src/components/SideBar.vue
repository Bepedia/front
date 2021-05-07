<template>
    <v-navigation-drawer
            class="nav-bar"
            permanent
            expand-on-hover
            absolute
    >
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar>
                    <v-img src="../assets/logo.png"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Bépédia
                    </v-list-item-title>
                    <v-list-item-subtitle class="subtitle">{{ user }}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
                nav
                dense
        >
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-home</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Accueil</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-cupcake</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Recette</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-content-cut</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Coutures</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-google-downasaur</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Bêtises</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-image</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Galerie</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-emoticon-happy-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Nendoroids</v-list-item-title>
            </v-list-item>
            <v-list-item link>
                <v-list-item-icon>
                    <v-icon color="white">mdi-paw</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="icon-text">Pets</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
    export default {
        name: "SideBar",
        props: ['user']
    }
</script>

<style scoped>
    .nav-bar {
        background: royalblue!important;
    }

    .title, .subtitle, .icon-text {
        color: white!important;
    }
</style>

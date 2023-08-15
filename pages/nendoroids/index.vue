<template>
  <div class="main-container">
    <v-progress-linear
      indeterminate
      v-if="loading"
    ></v-progress-linear>

    <div class="owned-container">

      <v-text-field label="Rechercher" autocomplete="false" v-model="search.q">
        <v-icon
          slot="append"
        >
          mdi-magnify
        </v-icon>
      </v-text-field>

      <v-chip-group
        v-model="search.owned"
        active-class="primary--text"
      >
        <div class="chips-container">
          <v-chip value="all">
            Tout ({{stats.owned + stats.not_owned}})
          </v-chip>

          <v-chip value="owned">
            J'ai ({{stats.owned}})
          </v-chip>

          <v-chip value="not-owned">
            A pas ({{stats.not_owned}})
          </v-chip>
        </div>

      </v-chip-group>

    </div>

    <v-virtual-scroll :bench="2" width="100%" height="600" item-height="300" :items="rows" class="nendoroids-container">

      <template v-slot:default="{ item }">

        <div :key="item.id">
          <NendoroidRow @ownedChanged="updateNendoroid($event)" :items="item"/>
        </div>

      </template>

    </v-virtual-scroll>

    <SnackbarMessage @close="updated = false"
                     :snackbar="updated"
                     :text="updateMessage"/>

  </div>
</template>

<script>
import NendoroidRow from "~/components/nendoroids/NendoroidRow";
import _ from 'lodash';

export default {
  name: "index",
  components: {
    NendoroidRow
  },
  computed: {
    owned() {
      return this.search.owned;
    },
    q() {
      return this.search.q;
    },
    rows() {
      return _.chunk(this.nendoroids, 2);
    }
  },
  data() {
    return {
      nendoroids: [],
      loading: true,
      updated: false,
      updateMessage: '',
      search: {
        q: null,
        owned: "all"
      },
      stats: {
        owned: 0,
        not_owned: 0
      }
    }
  },
  watch: {
    owned(value) {
      this.search.q = '';
      this.runSearch();
    },
    q(value) {
      this.debounceSearch();
    }
  },
  mounted() {
    this.$store.dispatch('nendoroids/getNendoroids', {}).then(nendoroids => {
      this.nendoroids = nendoroids.data;
      this.loading = false;
    });
    this.updateStats();
  },
  methods: {
    updateStats() {
      this.$store.dispatch('nendoroids/getStats').then(stats => {
        this.stats = stats.data;
      })
    },
    debounceSearch: _.debounce(function (e) {
      this.runSearch();
    }, 500),
    updateNendoroid(item) {
      this.loading = true;
      this.$store.dispatch('nendoroids/updateNendoroid', item).then(() => {
        this.updateStats();
        this.loading = false;
        this.updateMessage = item.owned ? 'Nendoroid ajoutée !' : 'Nendoroid retirée...';
        this.updated = true;
        if (this.owned && !item.owned) {
          const idx = this.nendoroids.findIndex(i => i.id === item.id);
          if (idx > -1) {
            this.nendoroids.splice(idx, 1);
          }
        }
        setTimeout(() => {
          this.updated = false;
        }, 2000);
      });
    },
    runSearch() {
      this.nendoroids = [];
      this.loading = true;
      const payload = {};
      if (this.search.q && this.search.q.length > 0) {
        payload['q'] = this.search.q;
      }
      if (this.owned) {
        payload['owned'] = this.owned;
      }
      this.$store.dispatch('nendoroids/getNendoroids', payload).then(nendoroids => {
        this.nendoroids = nendoroids.data;
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>

.main-container {
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nendoroids-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}

.owned-container {
  width: calc(100% - 20px);
}

.owned-container .chips-container {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 100%;
}

</style>

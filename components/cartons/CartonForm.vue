<template>

  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="374"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-card-title>
      {{ updateItem ? 'Mettre à jour carton' : 'Nouveau carton'}}
    </v-card-title>

    <v-divider></v-divider>

    <div class="form-container">

      <v-text-field
        v-model="model.name"
        label="Nom du carton"
      ></v-text-field>

      <v-divider></v-divider>

      <v-list>
        <v-subheader>Contenu</v-subheader>

        <v-list-item
          class="list-item"
          v-for="(item, i) in model.items"
          :key="i"
        >

          <div class="list-item-icon">
            <v-icon>mdi-content-paste</v-icon>
          </div>

          <v-list-item-content>
            <v-text-field
              autocomplete="false"
              v-model="item.label"
              label="Contenu"
            ></v-text-field>
          </v-list-item-content>

          <div class="list-item-icon">
            <v-btn
              class="mx-2"
              fab
              small
              color="primary"
              @click="removeItem(i)"
            >
              <v-icon dark>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>

        </v-list-item>

        <div class="button-container">
          <v-btn
            class="mx-2"
            fab
            small
            color="primary"
            @click="addItem"
          >
            <v-icon dark>
              mdi-plus
            </v-icon>
          </v-btn>

        </div>

      </v-list>

      <v-divider></v-divider>

      <div class="item-count">

        <v-text-field type="number" v-model="model.nbItems">
          <span
            slot="prepend"
          >
            Nombre d'objets
          </span>
        </v-text-field>

      </div>

    </div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="deep-purple lighten-2"
        text
        @click="createItem"
      >
        Sauvegarder
      </v-btn>
    </v-card-actions>

  </v-card>

</template>

<script>
export default {
  name: "CartonForm",
  props: ['updateItem'],
  methods: {
    createItem() {
      this.loading = true;
      this.$emit('save', this.model);
    },
    addItem() {
      this.model.items.push({
        label: ''
      });
    },
    removeItem(i) {
      this.model.items.splice(i, 1);
    }
  },
  data() {
    return {
      loading: false,
      model: {
        name: '',
        nbItems: 0,
        items: [
          {
            label: ''
          }
        ]
      }
    }
  },
  mounted() {
    if (this.updateItem) {
      this.model = this.updateItem;
    }
  }
}
</script>

<style scoped>

.form-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.list-item-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-item {
  padding: 0 !important;
}

</style>

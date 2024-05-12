<template>
  <div class="relative">
    <v-card class="scrollable">
      <v-list color="#0D1E51" dark>
        <!-- {{ functionList }} -->
        <v-list-item-group
          class="multi_column"
          v-model="selectedItem"
          color="primary"
        >
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <router-link :to="{ path: item.link }">
                {{ item.text }}
                <!-- {{ item.link }} -->
              </router-link>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    selectedItem: 1,
    items: [],
  }),
  components: {},
  props: {
    value: {
      // v-model with currentGroupsFunctionList.
      type: Array,
      Required: true,
    },
    functionList: {
      type: Array,
      Required: true,
    },
    function_name_vs_func_data_dict: {
      type: Object,
      Required: true,
    },
  },
  methods: {
    buildItemsList() {
      this.items = [];
      for (var func_data of this.value) {
         item = {
          text: func_data.ConcatName,
          link: func_data.TargetPath,
          icon: "mdi-clock",
        };
        this.items.push(item);
      }
      if(this.items !== null && this.items.length % 2 !== 0)
      {
          var item = {
          text: "",
          link: "",
          icon: "mdi-clock",
        };
        this.items.push(item);
      }
    },
  },
  watch: {
    value: function (val) {
      this.buildItemsList();
    },
  },

};
</script>


<style scoped>
.scrollable {
  overflow-y: scroll;
  max-height: 600px !important;
  width: 1000px !important;
  overflow-x: hidden;
}

.multi_column {
  column-count: 2;

  /* width: 33%;
  display: inline-block; */

  /* max-height: 28000px !important;
  display: flex;
  flex-flow: column wrap; */
}

.custom {
  display: flex;
}

.mycol {
  background-color: blue;
  overflow:  hidden !important;
}

div.relative {
  position: absolute;
  left: 265px;
  overflow: hidden;
  z-index: 2000 !important;
  /* padding-top: -550px; */
}
</style>
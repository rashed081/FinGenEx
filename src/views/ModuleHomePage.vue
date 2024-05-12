


<template>
  <v-container class="fill-height" fluid style="min-height: 434px">
    <v-fade-transition mode="out-in">
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="9" md="7">

          <a :href="commonMixin().getUrl(HomeApplication.url)">
            <v-img src="@/assets/images/module/leads.png" contain>
            </v-img>
          </a>

        </v-col>
      </v-row>
    </v-fade-transition>
  </v-container>
</template>



<script lang="ts">
import { HomeApplication } from "@/../public/configURL";
import router from "@/router/app_router";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import {commonMixin} from "../mixins/CommonMixin"

export default defineComponent({
  name: "HomePage",
setup() {
      const route = useRoute();
        const store = useStore();
        onMounted(() => {
          const request = route.params.requestData;
    const requestDecript = atob(request as any);
    const requestBody = JSON.parse(requestDecript);
    if (requestBody.data.JwtToken) {
      store
        .dispatch("setStateFromLogInData", requestBody)
        .then(() => {
          //
        })
        .catch(() => {
          router.push({ path: "/login" });
        });
    } else {
      router.push({ path: "/login" });
    }
    //this.$Progress.start();
    store
      .dispatch("CreateMenuByID", requestBody.data.UserId)
      .then((response) => {
        if (!response.data.ResponseStatus) {
          router.push({ path: "/" });
        } else {
          
       alert(" from module page test")
          router.push({ path: "/home" });
        }
        //this.$Progress.finish();
      })
      .catch(() => {
       
        //this.$Progress.fail();
      });
  })
  return{
    commonMixin,HomeApplication
  }
},
});


</script>



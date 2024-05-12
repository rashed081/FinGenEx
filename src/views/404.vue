<template>
  <div>
    <v-card-text>
      <div class="customCss">
        <img class="notFoundImg" src="../assets/images/Access_rest.png" />
        <div class="bottomText">
          <h2>YOU ARE UNAUTHORIZED TO ACCESS THIS PAGE.</h2>
          <h4 class="subHeaderCss">Please contact your administrator or try later.</h4>
        </div>
         <v-btn variant="plain" class="btnGoHome" @click="Gohome">Click Here To Go Home</v-btn>
      </div>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router/app_router';

export default defineComponent({
  name: 'NotFound',
  setup(props) {
    function Gohome() {
      router.push('home');
    }
    return { Gohome };
  }
});
</script>

<style>
.customCss {
  margin-left: 35%;
  margin-top: 5%;
}
.notFoundImg {
  height: 350px !important;
  margin-bottom: 15px;
}
.subHeaderCss {
  margin-left: 10%;
}
.bottomText {
  margin-left: -8%;
}
.btnGoHome{
  margin-left: 11%;
  text-decoration: underline;
  color: #017698;
  
}
</style>
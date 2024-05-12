

<template>
  <div id="app">
    <v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
      <div>
        <v-tab-item>
          <v-card class="px-4">
            <v-card-text>
              <v-form ref="loginForm" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12">
                    <v-text-field v-model="loginUserID" :rules="loginUserIDRules" label="User ID" required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field v-model="loginPassword" :append-icon="show1 ? 'eye' : 'eye-off'"
                      :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1"
                      label="Password" hint="At least 1 characters" counter @click:append="show1 = !show1"></v-text-field>
                  </v-col>
                  <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                  <v-spacer></v-spacer>
                  <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                    <v-btn x-large block color="success" @click="login">
                      Login
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <v-snackbar v-model="snackbar" :vertical="vertical" timeout="10000" :color="snackbarColor" bottom right>
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-dialog>
  </div>
</template>



<script lang="ts">
import router from '@/router/app_router';
import store from '@/store';
import { defineComponent } from 'vue';

import {useProgress} from '@marcoschulte/vue3-progress';


export default defineComponent({
  name: 'add-tutorial',
  
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [{ name: 'Login', icon: 'mdi-account' }],
    valid: true,
    loginPassword: '',
    loginUserID: '',

    loginUserIDRules: [
      (v: any) => !!v || "Required",

      (v: any) => v.length >= 4 || "User ID must be at least 4 characters long",
      (v: any) =>
        /[a-z0-9]+/.test(v) ||
        "User ID must contain only alpha-numeric characters",
    ],
    emailRules: [
      (v: any) => !!v || "Required",
      (v: any) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],

    show1: false,
    rules: {
      required: (value: any) => !!value || 'Required.',
      min: (v: any) => (v && v.length >= 1) || 'Min 1 characters'
    },
    multiLine: true,
    snackbar: false,
    snackbarColor: 'red darken-2',
    text: ``,
    vertical: true
  }),
  created() {
    
    fetch('../../../../public/LoginInfo.json')
      .then(response => response.json())
      .then(jsonData => {
        sessionStorage.setItem('LoginData', JSON.stringify(jsonData));
      });


    fetch('../../../../public/ApplicationListInfo.json')
      .then(response => response.json())
      .then(jsonData => {
        sessionStorage.setItem('AplicationList', JSON.stringify(jsonData));
      });


    fetch('../../../../public/ApiNameInfo.json')
      .then(response => response.json())
      .then(jsonData => {
        sessionStorage.setItem('apiUrlPath', JSON.stringify(jsonData));
      });
  },

  methods: {
    login() {
     const progres= useProgress().start();
      //if (this.$refs.loginForm.validate()) {
      store
        .dispatch("LogIn", {
          userid: this.loginUserID,
          password: this.loginPassword,
        })
        .then((response) => {
          if (!response.data.ResponseStatus) {
            //this.seterrortext(response.data.ResponseMessage);
            progres.finish();
            alert('Invalid Credentials');
            //router.push({ path: "/" });

          } else {
            store
              .dispatch("CreateMenuByID", this.loginUserID)


              .then((response) => {
                if (store.state.user_Access_Info != null) {
                  sessionStorage.setItem("RoutingPage", JSON.stringify(store.state.user_Access_Info));
                  if (!response.data.ResponseStatus) {
                    //this.seterrortext(response.data.ResponseMessage);
                    progres.finish();
                    router.push({ path: "/" });
                  } else {
                    
                    //location.reload()
                    window.location.replace('/home') 
                    //router.push({ name: "Home Page" });
                    router.push({ name: "Module Home Page" });
                    progres.finish();

                  }
                }
              })
              .catch((e) => {
                if ("data" in e) {
                  if ("responseMessage" in e.data) {
                    //this.seterrortext(e.data.responseMessage);
                  } else {
                    //this.seterrortext(e.data.ResponseMessage);
                  }
                } else {
                  if ("response" in e) {
                    if ("responseMessage" in e.response.data) {
                      //this.seterrortext(e.response.data.responseMessage);
                    } else {
                      //this.seterrortext(e.response.data.ResponseMessage);
                    }
                  } else {
                    //this.seterrortext(e);
                  }
                }
                progres.finish();
              });
          }
        })
        .catch((e) => {
          if ("data" in e) {
            if ("responseMessage" in e.data) {
              //this.seterrortext(e.data.responseMessage);
            } else {
              //this.seterrortext(e.data.ResponseMessage);
            }
          } else {
            if ("response" in e) {
              if ("responseMessage" in e.response.data) {
                //this.seterrortext(e.response.data.responseMessage);
              } else {
                //this.seterrortext(e.response.data.ResponseMessage);
              }
            } else {
              //this.seterrortext(e);
            }
          }
          progres.finish();
        });
      //}
    },





    seterrortext(
      text = "There was an unexpected error. Please contact with system Administrator."
    ) {
      this.text = text;
      this.snackbar = true;
      this.snackbarColor = 'red darken-2';
    }
  }
});
</script>






 
    // onMounted(() => {
    //   alert("Im from mounted")
    // })


  //   const store = useStore()
  //   const token = computed(() => store.getters.getToken);
  //   const totalCount = computed(() => store.getters.totalCount);
  //  const {  reuseData,reuseMethod,$postConfig}=mixin;

  //   //onMounted(() => store.dispatch("LogIn",));
  //   const getProductId=mixin.getProductId("0031","1110000001");
  //   //console.log("Test",getProductId)
 






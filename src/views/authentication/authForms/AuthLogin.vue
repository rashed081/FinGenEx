<script lang="ts">
// import { ref } from 'vue';
// import Google from '@/assets/images/auth/social-google.svg';
// import { useRouter } from 'vue-router';
// import { useAuthStore } from '@/stores/auth';
// import { Form, Field } from 'vee-validate';
// import * as Yup from 'yup';

// const checkbox = ref(false);
// const valid = ref(false);
// const show1 = ref(false);
// //const logform = ref();
// const password = ref('admin123');
// const username = ref('info@codedthemes.com');
// const passwordRules = ref([
//   (v: string) => !!v || 'Password is required',
//   (v: string) => (v && v.length <= 10) || 'Password must be less than 10 characters'
// ]);
// const emailRules = ref([(v: string) => !!v || 'E-mail is required', (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid']);

// function validate(values: any, { setErrors }: any) {
//   const authStore = useAuthStore();
//   return authStore.login(username.value, password.value).catch((error) => setErrors({ apiError: error }));
// }


import router from "@/router/app_router";
import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "add-tutorial",
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [{ name: "Login", icon: "mdi-account" }],
    valid: true,
    loginPassword: "",
    loginUserID: "",

    loginUserIDRules: [
      (v: any) => !!v || "Required",
      (v: any) => /.+@.+\..+/.test(v) || "User ID must be valid",
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
      required: (value: any) => !!value || "Required.",
      min: (v: any) => (v && v.length >= 1) || "Min 1 characters",
    },
    multiLine: true,
    snackbar: false, 
    snackbarColor: "red darken-2",
    text: ``,
    vertical: true,
  }),


  methods: {


   
      login() {

        //this.Progress.start();
        //if (this.$refs.loginForm.validate()) {
        store
          .dispatch("LogIn", {
            userid: this.loginUserID,
            password: this.loginPassword,
          })
          .then((response) => {
            //console.log("response from login page:",response)
            if (!response.data.ResponseStatus) {
              //console.log("response from login page:",response.data.ResponseStatus)
              //this.seterrortext(response.data.ResponseMessage);
              //this.$Progress.fail();
              router.push({ path: "/" });

            } else {
              store
                .dispatch("CreateMenuByID", this.loginUserID)
                .then((response) => {
                  if (!response.data.ResponseStatus) {
                    //this.seterrortext(response.data.ResponseMessage);
                    //this.$Progress.fail();
                    router.push({ path: "/" });
                  } else {
                    //this.$Progress.finish();
                    router.push({ name: "Home Page" });
                    router.push({ name: "Module Home Page" });
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
                  //this.$Progress.fail();
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
            //this.$Progress.fail();
          });
        //}
    },

    seterrortext(
      text = "There was an unexpected error. Please contact with system Administrator."
    ) {
      this.text = text;
      this.snackbar = true;
      this.snackbarColor = "red darken-2";
    },
  },
});


</script>

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
                      <v-text-field
                        v-model="loginUserID"
                        :rules="loginUserIDRules"
                        label="User ID"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="loginPassword"
                        :append-icon="show1 ? 'eye' : 'eye-off'"
                        :rules="[rules.required, rules.min]"
                        :type="show1 ? 'text' : 'password'"
                        name="input-10-1"
                        label="Password"
                        hint="At least 1 characters"
                        counter
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    </v-col>
                    <v-col class="d-flex" cols="12" sm="6" xsm="12"> </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="d-flex" cols="12" sm="3" xsm="12" align-end>
                      <v-btn
                        x-large
                        block
                      
                        color="success"
                        @click="login"
                      >
                        Login
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-tab-item>
       
        <v-snackbar
          v-model="snackbar"
          :vertical="vertical"
          timeout="10000"
          :color="snackbarColor"
          bottom
          right
        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
              Close
            </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-dialog>
  </div>
</template>
<style lang="scss">
.custom-devider {
  border-color: rgba(0, 0, 0, 0.08) !important;
}

.googleBtn {
  border-color: rgba(0, 0, 0, 0.08);
  margin: 30px 0 20px 0;
}

.outlinedInput .v-field {
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-shadow: none;
}

.orbtn {
  padding: 2px 40px;
  border-color: rgba(0, 0, 0, 0.08);
  margin: 20px 15px;
}

.pwdInput {
  position: relative;

  .v-input__append {
    position: absolute;
    right: 10px;
  }
}

.loginForm {
  .v-text-field .v-field--active input {
    font-weight: 500;
  }
}
</style>

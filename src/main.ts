

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import BaseHeader from '@/components/shared/BaseHeader.vue';
import BlockUI from '@/components/shared/BlockUI.vue';
import DisplayElement from '@/components/shared/DisplayElement.vue';
// @ts-ignore
import CommonService from "@/mixins/CommonService";

//Mock Api data

import { fakeBackend } from '@/utils/helpers/fake-backend';

import VueRecaptcha from 'vue3-recaptcha-v2';
import Maska from 'maska';
// print
import print from 'vue3-print-nb';
//i18
import { createI18n } from 'vue-i18n';
import messages from '@/utils/locales/messages';
import './assets/css/main.css';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

const i18n = createI18n({
  locale: 'en',
  messages: messages,
  silentTranslationWarn: true,
  silentFallbackWarn: true
});

//new added
import store from './store';
import { useStore } from '../src/store/index';
import router from './router/app_router';
import 'vue3-toastify/dist/index.css';

import toast, { type ToastOptions } from 'vue3-toastify';


//new added end
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import { setupVeeValidate } from './vee-validate';
import { Vue3ProgressPlugin } from '@marcoschulte/vue3-progress';

const app = createApp(App);
app.use(toast,
  {
    position: 'bottom-right',
    theme: 'colored',
    transition: 'slide'
  } as ToastOptions
)
app.use(Vue3Toastify,
  {
    autoClose: 6000,
  } as ToastContainerOptions,
);

setupVeeValidate(app)
fakeBackend();
//app.config.globalProperties.$commonMixin = toast;


app.use(router);
app.use(PerfectScrollbar);
app.use(createPinia());
app.use(VueTablerIcons);
app.use(print);
app.use(BaseHeader);
//app.use(DatePickerWithText);

app.component(BlockUI);
app.use(DisplayElement);
app.use(VueRecaptcha, {
  siteKey: '6LdzqbcaAAAAALrGEZWQHIHUhzJZc8O-KSTdTTh_',
  alterDomain: false // default: false
});
app.use(store).use(useStore);
app.use(i18n);
app.use(Maska);
app.use(VueApexCharts);

app.config.globalProperties.$CommonService=CommonService
app.use(Vue3ProgressPlugin);


app.config.globalProperties.CommonService = CommonService

  
app.use(vuetify).mount('#app');
app.component('EasyDataTable', Vue3EasyDataTable);


//for routing block start
router.beforeEach((to: any, from: any, next: any) => {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {

    if (!store.getters.isLoggedIn && to.params.requestData) {
      const request = to.params.requestData;
      const requestDecript = atob(request);
      const requestBody = JSON.parse(requestDecript);
      //need to check if the JWT token is valid here

      if (requestBody.data.JwtToken) {
        next();
      } else {
       
        next({
          name: 'login'
        });
      }
    } else if (!store.getters.isLoggedIn) {
      // user is NOT logged in
      next({
        name: 'login'
      });
    } else {

      next(

      );
    }
  } else if (to.matched.some((record: any) => record.meta.requiresVisitor)) {
    if (store.getters.isLoggedIn) {

      next({
        name: "Home Page",
      });
    } else {

      next();
    }
  } else {

    next();
  }
});


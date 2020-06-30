import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

import 'bootstrap/dist/css/bootstrap.css';
//import './assets/css/teste.css';
import './assets/js/teste';
import 'bootstrap/dist/js/bootstrap';
import 'jquery/dist/jquery';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000'; /*utilizado se for rodar localmente, sem build*/
//Endereço abaixo serve para ser utilizado sempre que vc rodar o Build, e este seria o endereço de produção.
//Vue.http.options.root = process.env.API_URL?process.env.API_URL: 'http://localhost:3000';


Vue.http.interceptors.push((req, next) => {
  //é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informaçã de segurança aqui');
  console.log("Lidando com request");

  next (res => {
    console.log('lidando com a resposta')
    //é possível acessar os dados da resposta e realizar transformações antes
    console.log(res.body);
  });
});

Vue.use(VueRouter);

const router = new VueRouter({ 
  routes,
  mode: 'history'
 });

 Vue.use(VeeValidate, {
   locale: 'pt_BR',
   dictionary: {
     pt_BR:{
       messages:msg
     }
   }
 });


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

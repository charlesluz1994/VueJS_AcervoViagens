//import Cadastro from './components/cadastro/Cadastro.vue';
//Estou importando o Cadastro como uma função, para que ele seja chamado somente quando precisarem nele.
//Tornando assim o projeto mais leve, é uma boa maneira de fazer isto neste caso.
const Cadastro = () => System.import('./components/cadastro/Cadastro.vue')

import Home from './components/home/Home.vue';


export const routes = [
    {path: '', name: 'home', component: Home, titulo:'Home', menu:true}, /* se deixar o path em branco, ele entende como somente '/', em component, é colocado a tela que ele irá abrir*/
    {path: '/cadastro', name: 'cadastro', component: Cadastro, titulo: 'Cadastro', menu:true},
    {path: '/cadastro/:id', name: 'altera', component: Cadastro, titulo: 'Cadastro', menu:false},
    {path: '*', component:Home, menu:false}
];
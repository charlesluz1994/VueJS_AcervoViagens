<template>
  <div>
   <!-- Caso Queira importar uma imagem do projeto, salva na sua máquina.
   Lembre-se de copiar também a pasta static após o build para subir em produção. 
   <img src="/static/Europa.jpeg">
   --> 
    <h1 class="centralizado">{{ titulo }}</h1>
    <p v-show="mensagem" class="centralizado"> {{ mensagem }}</p>
    <input
      type="search"
      class="filtro"
      @input="filtro=$event.target.value"
      placeholder="filtre pelo título da foto"
    />

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">

        <meu-painel :titulo="foto.titulo" >

          <imagem-responsiva v-meu-transform:scale.animate="1.1" :url="foto.url" :titulo="foto.titulo"/>
          
          <router-link :to="{ name:'altera', params: {id: foto._id} }">
            <meu-botao tipo="button" rotulo="Alterar"/>
          </router-link>
          <meu-botao tipo="button" 
          rotulo="Remover" 
          @botaoAtivado="remove(foto)"
          :confirmacao="true"
          estilo="perigo"/>
        </meu-painel>
      </li>
    </ul>
  </div>
</template>

<script>
import Painel from '../shared/painel/Painel.vue';
import ImagemResponsiva from '../shared/imagem-responsiva/ImagemResponsiva.vue';
import Botao from '../shared/botao/Botao.vue';
//importou diretiva.Tem que adicionar na propriedade directives logo abaixo!
import transform from '../../directives/Transform';
import FotoService from '../../domain/foto/FotoService';

export default {
  components: {
    "meu-painel": Painel,
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao" : Botao
  },

  directives:{
    'meu-transform': transform
  },

  data() {
    return {
      titulo: "Acervo Viagens",
      fotos: [],
      filtro: "",
      mensagem: ""
    }
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = RegExp(this.filtro.trim(), "i");
        return this.fotos.filter(foto => exp.test(foto.titulo));
      } else {
        return this.fotos;
      }
    }
  },

    methods:{

      remove(foto){

        this.service.apaga(foto._id)
        .then(()=> {
          let indice = this.fotos.indexOf(foto);
          this.fotos.splice(indice, 1);
          this.mensagem = 'Foto removida com sucesso';
          }, err => {
        this.messagem = err.message;
        });

      }
    },
  created() {

    this.service = new FotoService(this.$resource);
    this.service.lista()
    .then(fotos => this.fotos = fotos, err =>{this.mensagem = err.message;});

  }
};
</script>

<style>

.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}
</style>

<template>
  <div class="instruction mobile-container">
    <div class="text-page">
      <div v-if="instructions[instructionId]" v-html="instructions[instructionId].main_text"></div>
      <Spinner v-if="!instructions[instructionId] && !notFound" blockHeight="120"/>
      <p class="alert-not-found" v-if="notFound">Инструкция не найдена.</p>
      <EndMobilePage/>
    </div>
  </div>
</template>

<script>
import EndMobilePage from '@/components/EndMobilePage.vue'
import apiCall from '@/utils/api'
import Spinner from '@/components/spinners/Spinner.vue'

export default {
  name: 'instructions-page',
  data: function (){
    return {
      url: 'get/instructions/instruction',
      instructions: {},
      instructionId: "",
      notFound: false
    }
  },
  components: {
    EndMobilePage,
    Spinner,
  },
  methods: {
    getItemsList (){
      this.notFound = false;
      apiCall({url: this.url, data: {items: [this.instructionId]}, method: 'POST'}).then(resp => {
        if(!resp.notFound)
          this.instructions = Object.assign({}, this.instructions, resp);
        else
          this.notFound = true;
      });
    },
  },
  created (){
    this.instructionId = this.$route.params.id;
    this.getItemsList();
  },
  beforeRouteUpdate (to, from, next) {
    this.instructionId = to.params.id;
    if(!this.instructions[this.instructionId])
      this.getItemsList();
    next();
  }
}
</script>

<style lang="scss">
.text-page{
  max-width: 1200px;
  margin: 0 auto;

  .wide-image{
    max-width: 100%;
    margin: 20px 0;
    margin-bottom: 10px;
  }
  .medium-left-image{
    max-width: 50%;
    float: left;
    margin: 5px;
  }
  .main-title{
    margin: 10px 0;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #40260E;
  }
  .paragraph{
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #40260E;
    margin: 10px 0;
  }
  .bold-text{
    font-weight: bold;
  }
  p{
    font-size: 12px;
    line-height: 14px;
    color: #40260E;
    margin: 5px;
  }
  a{
    font-size: 12px;
    line-height: 14px;
    color: #007790;
  }
  ul{
    font-size: 12px;
    line-height: 14px;
    color: #40260E;
  }
  li{
    font-size: 12px;
    line-height: 14px;
    color: #40260E;
    margin: 5px;
    margin-left: 30px;
  }
  .alert-not-found{
    text-align: center;
    font-size: 20px;
    color: #6d340a;
    margin-top: 25px;
  }
}
</style>
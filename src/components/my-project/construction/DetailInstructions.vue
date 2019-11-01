<template>
  <div class="detail-instructions">
    <p class="second-title">Инструкции:</p>

    <div class="instruction-list" v-if="instructionsStatus">

      <router-link
        v-for="item in instructions" :key="allInstructions[item].id"
        :to="'/instructions/' + item"
        tag="div"
        class="instruction-item">

        <div class="image-container">
          <img :src="allInstructions[item].picture" alt="">
        </div>
        <div class="text-item">
          <span class="title">{{allInstructions[item].name}}</span>
          <span>{{allInstructions[item].text}}</span>
        </div>

      </router-link>

    </div>
    <Spinner size="30" v-else/>

  </div>
</template>

<script>
import apiCall from '@/utils/api'
import Spinner from '@/components/spinners/Spinner.vue'

export default {
  name: 'detail-instructions',
  props: {
    'instructions': {
      type: Array,
      default: function (){return []}
    }
  },
  data: function (){
    return {
      url: 'get/instructions/preview',
      allInstructions: {},
      instructionsStatus: false
    }
  },
  components: {
    Spinner
  },
  methods: {
    getItemsList (arrInstructions){
      if(!arrInstructions.length) return;
      this.instructionsStatus = false;

      apiCall({url: this.url, data: {items: arrInstructions}, method: 'POST'}).then(resp => {
        this.allInstructions = Object.assign({}, this.allInstructions, resp.instructions);
        this.instructionsStatus = true;
      });
    },
    checkInstructions (){
      return this.instructions.filter((item) => {
        return !this.allInstructions[item];
      });
    }
  },
  watch: {
    instructions (){
      this.getItemsList(this.checkInstructions());
    },
  },
  created (){
    this.getItemsList(this.checkInstructions());
  }
}
</script>

<style scoped lang="scss">
.second-title{
  font-weight: bold;
  font-size: 13px;
  line-height: 15px;
  color: #40260E;
  margin-top: 15px;
}
.instruction-list{
  .instruction-item{
    display: flex;
    align-items: center;
    margin-top: 15px;
    cursor: pointer;

    .image-container{
      width: 30px;
      height: 30px;
      background: #B8934B;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 30px;
    }
    .text-item{
      font-size: 12px;
      line-height: 14px;
      color: #40260E;

      .title{
        font-weight: bold;
        margin-right: 5px;
      }
    }
  }
}
</style>
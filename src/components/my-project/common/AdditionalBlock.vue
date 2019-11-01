<template>
  <div class="additional-block" v-if="statusMainElement">
    <div class="spoiler additional-block-detail" @click="isShowed = !isShowed; onceShowed = true;">{{title}}</div>

    <div class="additional-block-content" v-if="isShowed && statusMainElement">
      <div class="block-menu">
        <p class="detail">Detail</p>
        <div class="qty-pr">
          <p class="qty">qty</p>
          <p class="price">price</p>
        </div>
      </div>

      <div class="block-items" v-if="Object.entries(listNecessaryItems).length > 0">

        <div class="item" v-for="(item, index) in listNecessaryItems" :key="index">
          <div class="detail">
            <div class="detail-image">
              <img :src="item.picture" alt="">
            </div>
            <p class="detail-name">{{item.name}}</p>
          </div>
          <div class="detail-qty-pr">
            <p class="detail-qty">{{item.quantity}}</p>
            <p class="detail-price">{{item.price}}р</p>
          </div>
        </div>

      </div>
      <Spinner v-else-if="!status" size="30"/>
      <div v-else class="absense-text">Необходимые отсутствуют</div>

    </div>
  </div>
</template>

<script>
import { GET_NECESSARY_DETAILS, GET_NECESSARY_FASTENERS } from '@/store/actionConstants/actions'
import Spinner from '@/components/spinners/Spinner.vue'

export default {
  name: 'additional-block',
  props: ['necessaryType', 'itemId', 'currentProjectName', 'statusMainElement'],
  components: {
    Spinner
  },
  data: function (){
    return {
      title: "",
      typeAction: "",
      typePrefix: "",
      isShowed: false,
      onceShowed: false
    }
  },
  methods: {
    getItemsList (){
      this.$store.commit(this.typePrefix + 'clearItemsList');
      this.$store.dispatch(this.typePrefix + this.typeAction, {project: this.currentProjectName, items: [this.itemId]});
    }
  },
  computed: {
    listNecessaryItems (){
      return this.$store.getters[this.typePrefix + 'getAll'];
    },
    status (){
      return this.$store.getters[this.typePrefix + 'getStatusAll'];
    }
  },
  watch: {
    itemId (){
      this.getItemsList();
    },
    onceShowed (){
      this.getItemsList();
    }
  },
  created () {
    if(this.necessaryType === 'details'){
      this.typeAction = GET_NECESSARY_DETAILS;
      this.typePrefix = 'necessaryDetails/';
      this.title = 'Необходимые детали';
    }else{
      this.typeAction = GET_NECESSARY_FASTENERS;
      this.typePrefix = 'necessaryFasteners/';
      this.title = 'Необходимый крепёж';
    }
  },
}
</script>

<style scoped lang="scss">
.additional-block{
  margin-top: 20px;

  .spoiler{
    font-weight: bold;
    font-size: 15px;
    line-height: 18px;
    color: #40260E;
    cursor: pointer;

    &:after{
      content: "";
      display: inline-block;
      background: url("/static/images/brown-triangle-down.png");
      width: 15px;
      height: 13px;
      margin-left: 10px;
      vertical-align: middle;
    }
  }
}
.additional-block-content{
  margin-top: 15px;
  transition: height 0.5s;
  overflow: hidden;

  .block-menu{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    line-height: 14px;
    color: #9D8C7D;
    border-bottom: 1px solid #CCC9C9;
    padding-bottom: 3px;

    .qty-pr{
      display: flex;
      justify-content: space-between;

      .qty{
        min-width: 30px;
        text-align: center;
      }
      .price{
        text-align: center;
        min-width: 70px;
      }
    }
  }
  .block-items{

    .item{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .detail{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .detail-image{
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
        .detail-name{
          font-size: 12px;
          line-height: 14px;
          color: #40260E;
        }
      }
      .detail-qty-pr{
        display: flex;
        justify-content: space-between;
        align-items: center;

        .detail-qty{
          min-width: 30px;
          text-align: center;
          font-size: 12px;
          line-height: 14px;
          color: #CA3110;
        }
        .detail-price{
          text-align: center;
          min-width: 70px;
          font-weight: bold;
          font-size: 14px;
          line-height: 16px;
          color: #D87400;
        }
      }
    }
  }
  .absense-text{
    margin-top: 5px;
    font-size: 12px;
    color: green;
  }
}
</style>
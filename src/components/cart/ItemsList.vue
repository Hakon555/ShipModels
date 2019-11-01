<template>
  <div class="cart-list">
    <div class="additional-block-content">
      <div class="block-items">
          <div class="item" v-for="item in getCartItems" :key="item.id">
            <div class="detail">
              <div class="detail-image">
                <img :src="item.picture" alt="">
              </div>
              <p class="detail-name" @click="$router.push('/my-project/catalog/' + item.project + '/' + item.id)">{{item.name}}</p>
            </div>
            <div class="detail-qty-pr">
              <p class="detail-qty">
                <span class="minus" @click="quantityMinus(item)">-</span>
                <span class="content" v-if="!item.processed">{{item.quantity}}</span>
                <span class="content" v-else><Spinner blockHeight="16" size="16"/></span>
                <span class="plus" @click="quantityPlus(item)">+</span>
              </p>
              <p class="detail-price">{{item.price}}р</p>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_CART_ITEMS, UPDATE_CART_ITEMS } from '@/store/actionConstants/actions'
import Spinner from '@/components/spinners/Spinner.vue'
import Vue from 'vue'

export default {
  name: 'cart-list',
  props: [],
  data: function(){
    return {
      processedItem: ""
    }
  },
  components: {
    Spinner
  },
  methods: {
    quantityPlus ({id, project, quantity}){
      this.processedItem = id;
      let itemForAdding = [{
        id,
        project,
        quantity: 1
      }];
      this.$store.dispatch('cart/' + UPDATE_CART_ITEMS, itemForAdding).then((resp)=>{
        this.processedItem = "";
      });
    },
    quantityMinus ({id, project, quantity}){
      //if(quantity <= 1) return;
      this.processedItem = id;
      let itemForAdding = [{
        id,
        project,
        quantity: 1,
        remove: true
      }];
      this.$store.dispatch('cart/' + UPDATE_CART_ITEMS, itemForAdding).then((resp)=>{
        this.processedItem = "";
      });
    },
  },
  computed: {
    getCartItems (){
      let as = this.$store.getters['cart/getCart'];
      as.forEach((element, index, array) => {
        array[index].processed = false;
        if(element.id === this.processedItem)
          array[index].processed = true;
      });
      return as;
    },
  },
}
</script>

<style scooped lang="scss">
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
          display: flex;

          span{
            margin: 0 2px;
            cursor: pointer;
          }
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
}
</style>
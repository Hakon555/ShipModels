<template>
  <div class="buying-block" v-if="isAuthenticated">
    <template v-if="statusCatalogElement">
      <p v-if="catalogItem.quantity > 0" class="availability">В наличии: {{catalogItem.quantity}}</p>
      <p v-else class="availability not-available">Нет в наличии</p>

      <div class="buying-params">
        <div class="price">{{catalogItem.price}}р</div>
        <div class="quantity-plus-minus">
          <div class="minus" @click="quantityMinus">-</div>
          <div class="quantity">{{quantity}}</div>
          <div class="plus" @click="quantityPlus">+</div>
        </div>
        <div v-if="!isBought && !buyingProcessed" @click="addToCart" class="button-buy" :class="{'non-active': !catalogItem.quantity}">КУПИТЬ</div>
        <div v-if="!isBought && buyingProcessed" class="button-go-to-cart"><Spinner size="30"/></div>
        <div v-if="isBought" class="button-go-to-cart" @click="$router.push('/cart')">ПЕРЕЙТИ В КОЗИНУ</div>
      </div>
    </template>
    <Spinner v-else size="30"/>
  </div>
</template>

<script>
import Spinner from '@/components/spinners/Spinner.vue'
import { GET_CART_ITEMS, UPDATE_CART_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'buying-block',
  props: ['catalogItem', 'statusCatalogElement'],
  data: function (){
    return {
      quantity: 1,
      isBought: false,
      buyingProcessed: false
    }
  },
  components: {
    Spinner
  },
  computed: {
    isAuthenticated (){
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    quantityPlus (){
      if(!this.catalogItem.quantity) return;
      this.quantity = (this.quantity + 1 <= this.catalogItem.quantity) ? this.quantity + 1 : this.catalogItem.quantity;
      this.isBought = false;
    },
    quantityMinus (){
      if(!this.catalogItem.quantity) return;
      this.quantity = (this.quantity - 1 >= 1) ? this.quantity - 1 : 1;
      this.isBought = false;
    },
    addToCart (){
      this.buyingProcessed = true;
      let project = this.$store.getters['myProjectItems/getProjectName'];
      let itemForAdding = [{
        id: this.catalogItem.id,
        project,
        quantity: this.quantity
      }];
      this.$store.dispatch('cart/' + UPDATE_CART_ITEMS, itemForAdding).then((resp)=>{
        this.isBought = true;
        this.buyingProcessed = false;
      });
    },
  },
  created (){
    this.isBought = false;
  }
}
</script>

<style scoped lang="scss">
.buying-block{
  width: 100%;
  margin-top: 20px;
}
.availability{
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  color: green;
  margin-right: 10px;
  margin-top: 5px;

  &.not-available{
    color: red
  }
}
.buying-params{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .price{
    font-weight: bold;
    font-size: 25px;
    color: #D87400;
  }
  .quantity-plus-minus{
    display: flex;
    font-size: 18px;
    text-align: center;
    color: #FF6B00;

    .plus, .minus{
      cursor: pointer;
    }

    .quantity{
      margin: 0 7px;
    }
  }
  .button-buy{
    width: 100px;
    height: 36px;
    background: #FB752A;
    border-radius: 18px;
    font-weight: bold;
    font-size: 13px;
    line-height: 36px;
    text-align: center;
    color: #FFFFFF;
    cursor: pointer;

    &.non-active{
      background: grey
    }
  }
  .button-go-to-cart{
    width: 100px;
    height: 36px;
    border: 1px solid #FB752A;
    border-radius: 18px;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    color: #FB752A;
    cursor: pointer;
  }
}
</style>
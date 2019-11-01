<template>
  <div class="cart-button" @click="goToCart">
    <img src="/static/images/cart.png" alt="" class="cart-icon">
    <div class="cart-circle">{{quantityCartItems}}</div>
  </div>
</template>

<script>
import { GET_CART_ITEMS, UPDATE_CART_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'menu-cart-button',
  computed: {
    quantityCartItems (){
      return this.$store.getters['cart/getCartQuantity']
    },
  },
  methods: {
    goToCart (){
      if(this.$route.fullPath !== "/cart"){
        this.$router.push('/cart');
        this.$emit('click');
      }
    }
  },
  created (){
    if(!this.$store.getters['cart/getCartStatus'])
      this.$store.dispatch('cart/' + GET_CART_ITEMS);
  },
}
</script>

<style scoped lang="scss">
.cart-button{
  margin-right: 15px;
  width: 43px;
  height: 40px;
  display: flex;
  position: relative;
  cursor: pointer;

  .cart-icon{
    margin: auto;
  }
  .cart-circle{
    border: 1px solid #f0b47c;
    border-radius: 50%;
    height: 17px;
    width: 17px;
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    font-weight: 400;
    font-size: 10px;
    line-height: 17px;
    color: #f0b47c;
    text-align: center;
  }
}
</style>
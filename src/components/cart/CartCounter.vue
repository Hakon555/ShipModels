<template>
  <div class="cart-counter">
    <div class="order-counting">
      <div class="order-counting-item">
        <p class="param">Товаров в корзине</p>
        <p class="value">{{quantityCartItems}}</p>
      </div>
      <div class="order-counting-item">
        <p class="param">Сумма</p>
        <p class="value">{{cartSum}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_CART_ITEMS, UPDATE_CART_ITEMS } from '@/store/actionConstants/actions'

export default {
  name: 'cart-counter',
  computed: {
    quantityCartItems (){
      return this.$store.getters['cart/getCartQuantity']
    },
    cartSum (){
      let cart = this.$store.getters['cart/getCart'];
      let sum = 0;
      cart.forEach(element => {
        sum += element.price * element.quantity;
      });
      return sum + 'р';
    },
  },
}
</script>

<style scooped lang="scss">
.order-counting{
  margin-top: 20px;
  padding-bottom: 10px;

  .order-counting-item{
    display: flex;
    align-items: center;
    justify-content: space-between;

    .param{
      font-size: 16px;
      line-height: 19px;
      color: #4D859D;
    }
    .value{
      font-size: 20px;
      line-height: 23px;
      color: #D87400;
    }
    &.cross-value{
      .value{
        text-decoration: line-through;
      }
    }
  }
}
</style>
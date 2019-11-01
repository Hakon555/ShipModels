<template>
  <div class="cart">

    <div v-if="mobileScreen" class="mobile-container">
      <template v-if="getCartItemsLength">
        <ItemsList/>
        <hr class="medium-hr">

        <CartCounter/>
        <hr class="medium-hr">

        <CartButtons/>
      </template>

      <p v-else class="empty-cart">Корзина пуста</p>
      <EndMobilePage/>
    </div>

    <div v-if="desktopScreen" class="desktop-container">

      <div v-if="getCartItemsLength" class="desktop-cart">
        <div class="cart-items">
          <div class="items-title">Товары в корзине</div>
          <div class="items-block">
            <ItemsList/>
            <hr class="medium-hr">
          </div>
        </div>
        <div class="sum-buy-block">
          <div class="container">
            <CartCounter/>
            <hr class="medium-hr">
            <CartButtons/>
          </div>
        </div>
      </div>

      <p v-else class="empty-cart">Корзина пуста</p>
      <EndMobilePage/>
    </div>

  </div>
</template>

<script>
import { GET_CART_ITEMS, UPDATE_CART_ITEMS } from '@/store/actionConstants/actions'
import ItemsList from '@/components/cart/ItemsList'
import CartCounter from '@/components/cart/CartCounter'
import CartButtons from '@/components/cart/CartButtons'
import EndMobilePage from '@/components/EndMobilePage.vue'

export default {
  name: 'cart',
  components: {
    ItemsList,
    CartCounter,
    CartButtons,
    EndMobilePage
  },
  computed: {
    getCartItemsLength (){
      return this.$store.getters['cart/getCart'].length;
    },
  },
  created () {
    if(!this.$store.getters['cart/getCartStatus'])
      this.$store.dispatch('cart/' + GET_CART_ITEMS);
  },
}
</script>

<style scoped lang="scss">
.medium-hr{
  width: 120px;
  height: 1px;
  background: #8F7C6A;
  margin: 0 auto;
  margin-top: 10px;
}
.empty-cart{
  text-align: center;
  font-size: 20px;
  color: #6d340a;
  margin-top: 25px;
}
.desktop-cart{
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  .cart-items{
    width: 50%;

    .items-title{
      margin-top: 25px;
      font-size: 20px;
      font-weight: bold;
    }
    .items-block{
      margin-left: 20px;
    }
    .medium-hr{
      margin-left: 0;
      margin-top: 20px;
    }
  }
  .sum-buy-block{
    width: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;

    .container{
      width: 320px;
      margin-top: 40px;
    }
  }
}
</style>
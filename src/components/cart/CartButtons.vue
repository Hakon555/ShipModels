<template>
  <div class="cart-buttons">
    <div class="adjacent-buttons-line">
      <div class="checkout" @click="$router.push('/checkout')">Оформить заказ</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'cart-buttons',
}
</script>

<style scooped lang="scss">
.adjacent-buttons-line{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.checkout{
  width: 170px;
  height: 36px;
  background: #FFFFFF;
  border: 2px solid #FB752A;
  box-sizing: border-box;
  border-radius: 18px;
  font-weight: bold;
  font-size: 15px;
  line-height: 30px;
  color: #FB752A;
  text-align: center;
  cursor: pointer;
}
</style>
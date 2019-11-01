<template>
  <div class="menu-action-buttons">

    <MenuCartButton @click="$emit('click')" v-if="isAuthenticated"/>

    <div class="purse-button" v-if="isAuthenticated">
      <img src="/static/images/wallet.png" alt="" class="purse-icon">
    </div>

  </div>
</template>

<script>
import MenuCartButton from '@/components/menu/MenuCartButton'

export default {
  name: 'MenuActionButtons',
  components: {
    MenuCartButton
  },
  computed: {
    isAuthenticated (){
      return this.$store.getters.isAuthenticated;
    },
  }
}
</script>

<style scoped lang="scss">
.menu-action-buttons{
  position: absolute;
  top: 7px;
  right: 20px;
  display: flex;

  .purse-button{
    width: 30px;
    height: 40px;
    display: flex;
    cursor: pointer;

    .purse-icon{
      margin: auto;
    }
  }
}
</style>
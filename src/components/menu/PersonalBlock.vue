<template>
  <div v-if="isVsible" class="personal">
      <div class="my-photo">
          <img :src="'/static/images/' + user.pic" alt="">
      </div>
      <template v-if="type === 'desktop'">
        <div class="person" >
          <p class="my-name">{{user.name}}</p>
          <p class="my-email">{{user.email}}</p>
        </div>
      </template>
      <template v-else>
        <p class="my-name">{{user.name}}</p>
        <p class="my-email">{{user.email}}</p>
      </template>
  </div>
</template>

<script>
import { USER_REQUEST } from '@/store/actionConstants/actions'

export default {
  name: 'PersonalBlock',
  props: ['type'],
  computed: {
    isVsible (){
      return this.$store.getters.isAuthenticated;
    },
    user (){
      return this.$store.getters.getProfile;
    },
  },
  created (){
    if(this.$store.getters.isAuthenticated){
      this.$store.dispatch(USER_REQUEST);
    }
  }
}
</script>

<style scoped lang="scss">
.personal{
  position: absolute;
  left: 20px;
  bottom: 10px;
  cursor: pointer;

  .my-photo{
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #AC9778;
    display: flex;
    align-content: center;
    overflow: hidden;
    margin-bottom: 20px;

    img{
      margin: auto;
    }
  }
  .my-name{
    font-size: 14px;
    line-height: 15px;
    color: #000000;
  }
  .my-email{
    font-size: 12px;
    line-height: 12px;
    color: #6F6F6F;
  }
}
</style>
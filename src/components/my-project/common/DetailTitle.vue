<template>
  <div class="detail-title" v-if="statusMainElement">
    <h1 class="main-title" @click="$emit('click')">{{currentItem.name}}</h1>
  </div>
</template>

<script>
export default {
  name: 'detail-title',
  props: ['currentItem', 'statusMainElement'],
}
</script>

<style scoped lang="scss">
h1.main-title{
  font-size: 18px;
  line-height: 21px;
  color: #40260E;
  font-weight: bold;
  margin-top: 20px;
}
</style>
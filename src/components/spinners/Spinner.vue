<template>
  <div class="spinner" :style="{height: blockHeight + 'px'}">
    <img :style="{width: size + 'px'}" src="/static/images/sk1-sp.png" alt="">
  </div>
</template>

<script>

export default {
  name: 'spinner',
  props: ['blockHeight', 'size'],
}
</script>

<style scoped lang="scss">
.spinner{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: 50px;
    animation: rotateit 2.5s linear infinite;
  }
  @keyframes rotateit {
    from { transform: rotate(0deg);	}
    to { transform: rotate(360deg); }
  }
}
</style>
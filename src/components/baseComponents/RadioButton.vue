<template>
  <div class="radio-item">
    <input :name="name" :id="id" type="radio" :value="radioValue" class="custom-radio" :checked="isDefault" v-on:input="$emit('input', $event.target.value)">
    <label :for="id" class="radio-label">
      <slot></slot>
    </label>
  </div>
</template>

<script>

export default {
  name: 'radio-button',
  props: ['name', 'isDefault', 'radioValue'],
  data: function(){
    return {
      id: Math.random()*10000,
    }
  }
}
</script>

<style scoped lang="scss">
.custom-radio{
  position: relative;
  width: 16px;
  height: 16px;

  &:before{
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background: white;
    border-radius: 50%;
    border: 1px solid #00B2FE;
    top: -1px;
    left: -1px;
  }
  &:checked:after{
    content: "";
    display: block;
    width: 10px;
    height: 10px;
    position: absolute;
    background: #00B2FE;
    border-radius: 50%;
    top: 3px;
    left: 3px;
  }
}
.radio-item{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 20px;
  width: 90%;

  .radio-label{
    margin-left: 20px;
    width: 200px;

    .item-title{
      font-size: 12px;
      line-height: 14px;
      color: #8F7C6A;
    }
  }
}
</style>
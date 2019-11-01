<template>
  <div v-if="value">
    <div class="modal-block-frame">
      <div class="modal-frame-light" @click="$emit('input', false)"></div>
      <div class="modal-container" ref="modal-container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalFrame',
  props: ["value"],
}
</script>

<style lang="scss">
.modal-frame-light{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: black;
  opacity: 0.2;
  z-index: 500;
}
.modal-block-frame{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  overflow: auto;
  z-index: 700;
  align-items: center;
}
.modal-container{
  z-index: 550;
  max-height: 100%;
}

//main-pop-up
.main-pop-up{
  background: white;
  width: 300px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.7);

  .pop-up-header{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 46px;
    position: relative;
    border-bottom: 1px solid #CCC9C9;

    .title{
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #8F7C6A;
    }
    .close-pop-up{
      position: absolute;
      width: 15px;
      height: 15px;
      background: url("/static/images/close-pop-up.png");
      right: 15px;
      cursor: pointer;
    }
  }
  .pop-up-content{
    padding: 10px;
  }
  &.long-pop-up{
    top: 0;
    position: absolute;
  }
}
//\main-pop-up

//standard-form
.standard-form{
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  form{
    width:100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .alert-wrong-field{
    font-size: 11px;
    line-height: 15px;
    color: #FF0000;
    margin-bottom: -15px;
    margin-left: 15px;
  }
  input[type="text"], input[type="password"]{
    width: 100%;
    height: 36px;
    background: #FFFFFF;
    border: 1px solid #BCADAD;
    box-sizing: border-box;
    border-radius: 12px;
    font-size: 16px;
    line-height: 36px;
    color: #8F7C6A;
    padding: 0 15px;
    margin-top: 15px;

    &:first-child{
      margin-top: 10px;
    }
  }
  textarea{
    width: 100%;
    height: 100px;
    background: #FFFFFF;
    border: 1px solid #BCADAD;
    box-sizing: border-box;
    border-radius: 12px;
    padding: 7px 15px;
    margin-top: 15px;
    font-size: 16px;
    color: #8F7C6A;
  }
  .form-button1{
    width: 100px;
    height: 36px;
    border: 1px solid #4D859D;
    box-sizing: border-box;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
    border-radius: 18px;
    font-weight: normal;
    font-size: 16px;
    line-height: 33px;
    text-align: center;
    color: #4D859D;
    margin: 0 15px;
    margin-top: 15px;
    background: none;
    cursor: pointer;
  }
}
//\standard-form
//standart message
.standart-message{
  text-align: center;
  color: #8F7C6A;
}
//\standart message
</style>
<template>
  <div class="change-status">
    <div class="change-detail-status" @click="toggleModal">Изменить статус детали</div>

    <ModalFrame v-model="changeStatusPopUp">
      <div class="main-pop-up">
        <div class="pop-up-header">
            <p class="title">Изменение статуса</p>
            <div class="close-pop-up" @click="toggleModal"></div>
        </div>
        <div class="pop-up-content">
          <div class="standard-form">
            <form @submit.prevent="changeStatus">
              <RadioButton name="change-status-radio" radioValue="1" @input="newStatus" :isDefault="choosedStatus === 1">
                <p class="item-title">Построена</p>
              </RadioButton>
              <RadioButton name="change-status-radio" radioValue="0" @input="newStatus" :isDefault="choosedStatus === 0">
                <p class="item-title">Не построена</p>
              </RadioButton>
              <RadioButton name="change-status-radio" radioValue="2" @input="newStatus" :isDefault="choosedStatus === 2">
                <p class="item-title">Сломана</p>
              </RadioButton>

              <button class="form-button1 button-change" v-if="!requestStatus">Изменить</button>
              <div class="form-button1 button-change" v-if="requestStatus"><Spinner size="30"/></div>
            </form>
          </div>
        </div>
      </div>
    </ModalFrame>
  </div>
</template>

<script>
import ModalFrame from '@/components/ModalFrame.vue'
import RadioButton from '@/components/baseComponents/RadioButton.vue'
import apiCall from '@/utils/api'
import Spinner from '@/components/spinners/Spinner.vue'

export default {
  name: 'change-status',
  props: ['currentItemId', 'currentProjectName'],
  data: function(){
    return {
      changeStatusPopUp: false,
      choosedStatus: 1,
      url: 'set/status/maked',
      requestStatus: false
    }
  },
  components: {
    ModalFrame,
    RadioButton,
    Spinner
  },
  methods: {
    toggleModal (){
      this.changeStatusPopUp = !this.changeStatusPopUp;
    },
    changeStatus (){
      this.requestStatus = true;
      apiCall({url: this.url, data: {project: this.currentProjectName ,item: this.currentItemId, status: this.choosedStatus}, method: 'POST'}).then(resp => {
        this.$emit('statusChanged');
        this.requestStatus = false;
        this.toggleModal();
      });
    },
    newStatus (newValue){
      this.choosedStatus = parseInt(newValue);
    }
  }
}
</script>

<style scoped lang="scss">
.change-detail-status{
  width: 170px;
  height: 36px;
  background: #FFFFFF;
  border: 1px solid #DB8453;
  box-sizing: border-box;
  border-radius: 18px;
  font-weight: bold;
  font-size: 12px;
  line-height: 35px;
  text-align: center;
  color: #DB8453;
  margin: 0 auto;
  margin-top: 25px;
  cursor: pointer;
}
.form-button1.button-change{
  border: 1px solid #DB8453;
  color: #DB8453;
}
</style>
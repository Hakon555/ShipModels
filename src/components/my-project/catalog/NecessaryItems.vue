<template>
  <div class="necessary-items" v-if="isAuthenticated">
    <div class="necessary-item" @click="toggleModal(); currentPopUp = 'detailsQuantity'" v-if="detailsQuantity || isFirstLoad">
      <img src="/static/images/add-all-details.png" alt="">
      <div class="quantity-items" >
          <p v-if="detailsQuantity">{{detailsQuantity}}</p>
          <Spinner class="spinner" size="16" v-else/>
      </div>
    </div>
    <div class="necessary-item" @click="toggleModal(); currentPopUp = 'fastenersQuantuty'" v-if="fastenersQuantuty || isFirstLoad">
      <img src="/static/images/add-all-nails.png" alt="">
      <div class="quantity-items">
          <p v-if="fastenersQuantuty">{{fastenersQuantuty}}</p>
          <Spinner class="spinner" size="16" v-else/>
      </div>
    </div>

    <ModalFrame v-model="modalAddToBasket">
      <div class="main-pop-up">
        <div class="pop-up-header">
            <p class="title">Добавление в корзину</p>
            <div class="close-pop-up" @click="toggleModal"></div>
        </div>
        <div class="pop-up-content">
          <div class="standard-form">
            <form>
              <p v-if="succesAdded" class="standart-message success">Товары добавлены!</p>
              <template v-else>
                <p class="standart-message">Добавить необходимые товары в корзину, в количестве {{getQuantityPopUp}} шт.?</p>
                <div class="form-button1 cancel-button" @click="toggleModal()">Отмена</div>
                <div class="form-button1 add-button" @click="addToBasket(currentPopUp)">Добавить</div>
              </template>
            </form>
          </div>
        </div>
      </div>
    </ModalFrame>
  </div>
</template>

<script>
import apiCall from '@/utils/api'
import Spinner from '@/components/spinners/Spinner.vue'
import ModalFrame from '@/components/ModalFrame.vue'
import { GET_CART_ITEMS, UPDATE_CART_ITEMS, ADD_NECESSARY_DETAILS_TO_CART, ADD_NECESSARY_FASTENERS_TO_CART } from '@/store/actionConstants/actions'

export default {
  name: 'necessary-items',
  props: ['itemId', 'currentProjectName'],
  data: function (){
    return {
      detailsQuantity: 0,
      fastenersQuantuty: 0,
      url: 'get/necessary/quantity',
      modalAddToBasket: false,
      currentPopUp: "",
      isDetailsAdded: false,
      isFastenersAdded: false,
      succesAdded: false,
      addProcessing: false,
      isFirstLoad: true
    }
  },
  components: {
    Spinner,
    ModalFrame
  },
  methods: {
    getItemsList (){
      apiCall({url: this.url, data: {project: this.currentProjectName, items: [this.itemId]}, method: 'POST'}).then(resp => {
        this.detailsQuantity = resp.details;
        this.fastenersQuantuty = resp.fasteners;
        this.isFirstLoad = false;
      });
    },
    toggleModal (){
      this.modalAddToBasket = !this.modalAddToBasket;
    },
    closeModal(){
      this.modalAddToBasket = false;
    },
    addToBasket (currentPopUp){
      if(this.addProcessing) return;

      this.addProcessing = true;

      let typeAdding = "";
      if(currentPopUp === "detailsQuantity"){
        typeAdding = ADD_NECESSARY_DETAILS_TO_CART;
      }else{
        typeAdding = ADD_NECESSARY_FASTENERS_TO_CART;
      }

      this.$store.dispatch('cart/' + typeAdding, {id: this.itemId, project: this.currentProjectName}).then((resp)=>{
      this.succesAdded = true;
      if(currentPopUp === "detailsQuantity"){
        this.detailsQuantity = 0;
      }else{
        this.fastenersQuantuty = 0;
      }
      setTimeout(() => {
        this.closeModal();
        this.succesAdded = false;
        this.addProcessing = false;
      }, 1500);
      });
    }
  },
  computed: {
    getQuantityPopUp (){
      return this[this.currentPopUp];
    },
    isAuthenticated (){
      return this.$store.getters.isAuthenticated;
    },
  },
  watch: {
    itemId (){
      this.isFirstLoad = true;
      this.getItemsList();
    },
  },
  created (){
    this.getItemsList();
  }
}
</script>

<style scoped lang="scss">
.necessary-items{
  display: flex;
  margin-top: 15px;
  justify-content: space-evenly;

  .necessary-item{
    position: relative;
    cursor: pointer;

    .quantity-items{
      position: absolute;
      top: 5px;
      left: 2px;
      width: 16px;
      display: flex;
      justify-content: center;

      p{
        font-weight: 700;
        font-size: 9px;
        color: #ca3110;
      }
      .spinner{
        position: relative;
        top: -3px;
      }
    }
  }
}
.add-button{
  color: #FB752A;
  border-color: #FB752A;
}
.cancel-button{
  color: grey;
  border-color: grey;
}
.success{
  color: green;
}
</style>
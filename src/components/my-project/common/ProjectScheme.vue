<template>
  <div class="project-scheme">
    <div class="project-scheme-container" v-if="statusMainElement" ref="svg-container">
      <div class="image-scheme">
        <div class="scheme-wrapper">
          <object type="image/svg+xml" :data="currentItem.pictures.svg.main.src" id="ship" class="svg-scheme" @load="loadSvg"></object>
          <div class="detail-sign" :style="detailSignStyles" v-show="isDetailSign" @click="toggleModal"></div>
        </div>
      </div>

      <ModalFrame v-model="modalDetaiItem">
        <ModalProjectScheme :mainElement="currentItem" :currentItemId="currentModalItemId" :currentProjectName="currentProjectName" @closePopup="toggleModal"/>
      </ModalFrame>
    </div>

    <p class="svg-hint" v-if="statusMainElement">*кликните по детали, чтобы узнать дополнительную информацию.</p>
  </div>
</template>

<script>
import ModalFrame from '@/components/ModalFrame.vue'
import ModalProjectScheme from '@/components/my-project/common/ModalProjectScheme.vue'

export default {
  name: 'project-scheme',
  props: ['statusMainElement', 'currentItemId', 'currentProjectName'],
  data: function (){
    return {
      svgDocument: "",
      currentElement: "",
      isDetailSign: false,
      detailSign: {
        detailSignTop: 0,
        detailSignLeft: 0,
        detailSignWidth: 45,
        detailSignHeight: 45,
      },
      modalDetaiItem: false,
      currentModalItemId: ""
    }
  },
  components: {
    ModalFrame,
    ModalProjectScheme
  },
  methods: {
    loadSvg (event){
      this.svgDocument = event.target.contentDocument; //получаем svg элемент внутри object
      Object.values(this.svgDocument.getElementsByTagName("g")).forEach((element) => {
        element.style.cursor = "pointer";
      });
      this.svgDocument.addEventListener('click', (event) => {
        let groupElement = event.target.closest('g');
        this.chooseElement(groupElement, event);
      });
    },
    chooseElement (groupElement, event){
      if(groupElement){
        if(this.currentElement)
          this.signElement(this.currentElement, true);
        if(groupElement === this.currentElement){
          this.currentElement = "";
          this.showHideDetailSign();
          return;
        }
        this.showHideDetailSign(event);
        this.signElement(groupElement);
        this.currentElement = groupElement;
        this.prepareDataForModal();
      }else{
        this.showHideDetailSign();
        if(this.currentElement)
          this.signElement(this.currentElement, true);
        this.currentElement = "";
      }
    },
    signElement (element, removeStroke){
      if(removeStroke)
        element.removeAttribute("stroke", "red");
      else
        element.setAttribute("stroke", "red");
    },
    showHideDetailSign (event){
      if(!event){
        this.isDetailSign = false;
        return;
      }

      this.isDetailSign = true;

      let width = parseInt(getComputedStyle(this.$refs['svg-container']).width);
      let height = parseInt(getComputedStyle(this.$refs['svg-container']).height);

      let extremeCoords = {
        left: width - this.detailSign.detailSignWidth,
        top: height - this.detailSign.detailSignHeight,
      }

      this.detailSign.detailSignLeft = (event.pageX > extremeCoords.left) ? extremeCoords.left : event.pageX;
      this.detailSign.detailSignTop = (event.pageY > extremeCoords.top) ? extremeCoords.top : event.pageY;
    },
    toggleModal (){
      this.modalDetaiItem = !this.modalDetaiItem;
    },
    prepareDataForModal(){
      let itemId = this.currentElement.getAttribute('id');

      if(this.currentItem.pictures.svg.main.bindings[itemId])
        itemId = this.currentItem.pictures.svg.main.bindings[itemId];
      this.currentModalItemId = itemId;
    }
  },
  computed: {
    currentItem (){
      return this.$store.getters['myProjectItems/getItems'](this.currentItemId);
    },
    detailSignStyles (){
      return {
        top: this.detailSign.detailSignTop + "px",
        left: this.detailSign.detailSignLeft + "px",
        width: this.detailSign.detailSignWidth + "px",
        height: this.detailSign.detailSignHeight + "px",
      }
    }
  },
  watch: {
    currentItemId (){
      this.isDetailSign = false;
    }
  }
}
</script>

<style scoped lang="scss">
.image-scheme{
  margin-top: 15px;
  cursor: pointer;

  .scheme-wrapper{
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    .svg-scheme{
      width: 100%;
      max-height: 200px;
      min-height: 55px;
    }
    .detail-sign{
      background: url('/static/images/detail-sign.png') no-repeat;
      position: absolute;
      border-radius: 50%;
      box-sizing: border-box;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
      cursor: pointer;
    }
  }
}
.project-scheme-pagination{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 10px;

  .pag-item{
    width: 10px;
    height: 10px;
    background: #D9AA7E;
    border: 1px solid #6D340A;
    box-sizing: border-box;
    border-radius: 50%;
    margin: 0 15px;
    margin-top: 10px;

    &.active{
      background: #6D340A;
      border: 1px solid #AA846F;
    }
  }
}
.svg-hint{
  font-size: 11px;
  color: #8F7C6A;
  margin-top: 7px;
  text-align: center;
}
</style>
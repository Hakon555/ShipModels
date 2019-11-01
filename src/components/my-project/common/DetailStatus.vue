<template>
  <div class="detail-status">
    <div class="status-list">
      <p v-for="status in statuses" :key="status.id" class="status-item" :class="status.class">{{status.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail-status',
  props: ['statusList'],
  computed: {
    statuses (){
      let statuses = [];
      let id = 0;

      Object.entries(this.statusList).forEach(([key, value]) => {
        if(key === "bought"){
          if(value > 0){
            statuses.push({
              text: "Куплена",
              class: "bought",
              id: id
            });
          }else{
            statuses.push({
              text: "Не куплена",
              class: "",
              id: id
            });
          }
        }
        if(key === "maked"){
          switch(value){
            case 0:
              statuses.push({
                text: "Не построена",
                class: "",
                id: id
              });
              break;
            case 1:
              statuses.push({
                text: "Построена",
                class: "maked",
                id: id
              });
              break;
            case 2:
              statuses.push({
                text: "Сломана",
                class: "broken",
                id: id
              });
              break;
          }
        }
        if(key === "started"){
          switch(value){
            case true:
              statuses.push({
                text: "Начат",
                class: "started",
                id: id
              });
              break;
            case false:
              statuses.push({
                text: "Не начат",
                class: "",
                id: id
              });
              break;
          }
        }
        id++;
      });
      return statuses;
    }
  }
}
</script>

<style scoped lang="scss">
.status-list{
  display: flex;
  flex-wrap: wrap;

  .status-item{
    font-weight: bold;
    font-size: 10px;
    line-height: 12px;
    color: #BB6210;
    margin-right: 10px;
    margin-top: 5px;

    &.bought{
      color: green;
    }
    &.maked{
      color: green;
    }
    &.started{
      color: green;
    }
    &.broken{
      color: red;
    }
  }
}
</style>
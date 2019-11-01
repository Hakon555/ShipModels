export default function checkLoadedItems (currentItemId){
  let needDispatchItems = false;

  if(this.$store.getters['myProjectItems/getProjectName'] !== this.currentProjectName) return true;

  let currentItem = this.$store.getters['myProjectItems/getItems'](currentItemId);

  if(currentItem){
    if(currentItem.bindings.childs){
      currentItem.bindings.childs.forEach((element) => {
        if(!this.$store.getters['myProjectItems/getItems'](element))
          needDispatchItems = true;
      });
    }
  }else{
    needDispatchItems = true;
  }
  return needDispatchItems;
}
import apiCall from '@/utils/api'

class GetItemsVuex {
  constructor(settings){

    this.namespaced = settings.namespaced;
    this.state = { storeItems: {}, processed: [], projectName: "" };
    this.actions = {};
    this.mutations = {
      updateItemsList: (state, value) => {
        if(!value.notFound)
          state.storeItems = Object.assign({}, state.storeItems, value);
      },
      clearItemsList: (state, value) => {
        state.storeItems = {};
      },
      addItemsForProcessing: (state, itemsObj) => {
        state.processed = [...state.processed, ...itemsObj.items];
      },
      deleteItemsFromProcessing: (state, itemsObj) => {
        state.processed = state.processed.filter(item => {
          let isRemainElement = true;
    
          itemsObj.items.forEach(element => {
            if(element === item) 
              isRemainElement = false;
          });
          return isRemainElement;
        });
      },
      updateProjectName: (state, newName) => {
        state.projectName = newName;
      },
    };
    this.getters = {
      getItems: state => id => state.storeItems[id],
      getAll: state => state.storeItems,
      getStatus: state => id => state.processed.indexOf(id) === -1 && state.storeItems[id],
      getStatusAll: state => !(state.processed.length > 0),
      getProjectName: state => state.projectName
    };

    Object.entries(settings.actions).forEach(([key, actionsFunc]) => {
      this.actions[key] = this.defaultAction(actionsFunc, settings.url);
    });
  }

  defaultAction (actionsFunc, paramUrl) {
    return ({commit, dispatch, state}, requestParams) => {
      return new Promise((resolve, reject) => {

        let data = requestParams;
        let url = paramUrl;

        if(this.checkProcessed(state, data.items)) return;

        (({data = data, url = url}  =  {}) = actionsFunc({data, url}));//модификация параметров data и урл функцией заданной для каждого действия при создании модуля

        if(data.project !== state.projectName){
          commit('clearItemsList');
          commit('updateProjectName', data.project);
        }

        commit('addItemsForProcessing', data);
        apiCall({url: url, data, method: 'POST'})
          .then(resp => {
            commit('updateItemsList', resp);
            commit('deleteItemsFromProcessing', data);
            resolve(resp);
          })
          .catch(err => {
            commit('deleteItemsFromProcessing', data);
            reject(err);
          })
      })
    }
  }

  // turnToObject (param) {
  //   let res = {};
  
  //   switch (typeof param){
  //     case "string":
  //         res = {'items': [param]};
  //       break;
  //     case "object":
  //       if(param.length){
  //         res = {'items': param};
  //       }
  //       break;
  //     default:
  //       return;
  //   }
  //   return res;
  // }

  checkProcessed(state, arrItems){
    let res = false;
    arrItems.forEach((item) => {
      if(state.processed[item]) res = true;
    });
    return res;
  }
}

export default GetItemsVuex
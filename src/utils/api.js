import myProjectItems from '@/data/myProjectItems'
import myProjectItemsUpper from '@/data/myProjectItemsUpper'
import catalogItems from '@/data/catalogItems'
import fasteners from '@/data/fasteners'
import catalogFasteners from '@/data/catalogFasteners'
import constructionItems from '@/data/constructionItems'
import instructionsData from '@/data/instructions'
import statisticItems from '@/data/statisticItems'
import projects from '@/data/projects'
import cart from '@/data/cart'
// console.log(myProjectItems);

let token = localStorage.getItem('user-token') || '';//чтобы не выходил при перезагрузке
const users = {
  "a1@mail.ru": {
    name: 'a1',
    email: 'a1@mail.ru',
    passwd: '123',
    pic: 'my-project.png'
  },
  "a2@mail.ru": {
    name: 'a1',
    email: 'a2@mail.ru',
    passwd: '123',
    pic: 'my-project.png'
  }
};

const apiUrl = {
  'get/cart': function (){
    if(!token) return;
    if(!cart[token]) return {success: true};
    return {success: true, items: cart[token].items, quantity: cart[token].quantity};
  },
  'update/cart': function (data){//[{id: "item-44", project: "hms-pandora", quantity: 5}]
    if(!token) return {success: false};
    if(!cart[token]) cart[token] = {};
    if(!cart[token].items) cart[token].items = [];

    let quantityItems = 0;
    if(cart[token].quantity)//проверяет записано ли какое-то количество
      quantityItems = cart[token].quantity;

    data.forEach(({id, project, quantity, remove, otherType}) => {//перебирает все элементы запроса
      let item = {};
      let catalogItem = {};

      if(!myProjectItems[project]) otherType = true;

      if(!otherType){
        item = myProjectItems[project][id];
        catalogItem = catalogItems[project][id];
      }else{
        switch(project){
          case "fasteners":
            item = fasteners[id];
            catalogItem = catalogFasteners[id];
            break;
        }
      }
      
      let itemAttend = -1;

      cart[token].items.forEach((cartItem, key) => {//проверяет имеется ли такой товар в корзине
        if(id === cartItem.id && project === cartItem.project) itemAttend = key;
      });

      if(remove){//увеличивает или уменьшает общее количество товаров в корзине
        if(itemAttend !== -1)
          quantityItems -= (cart[token].items[itemAttend].quantity - quantity >= 0) ? quantity : cart[token].items[itemAttend].quantity;
      }else{
        quantityItems += quantity;
      }

      if(itemAttend !== -1){//работает с уже добавленными товарами
        if(remove){
          if(cart[token].items[itemAttend].quantity - quantity <= 0){
            cart[token].items.splice(itemAttend, 1);
          }else{
            cart[token].items[itemAttend].quantity -= quantity;
          }
        }else{
          cart[token].items[itemAttend].quantity += quantity;
        }
      }else{//работает с новыми товарами
        if(!remove)
          cart[token].items.push({
            id,
            project,
            name: item.name,
            picture: item.pictures.preview,
            price: catalogItem.price,
            available: catalogItem.quantity,
            quantity
          });
      }
    });
    cart[token].quantity = quantityItems;
    return {success: true};
  },
  'update/cart/necessary/details': function ({id, project}){
    let request = [];
    let details = myProjectItems[project][id].assemblyConnections.details;
    Object.entries(details).forEach(([key, value]) => {
      request.push({
        id: key,
        project,
        quantity: myProjectItems[project][key].quantity.needed
      });
    });
    return this['update/cart'](request);
  },
  'update/cart/necessary/fasteners': function ({id, project}){
    let request = [];
    let fasteners = myProjectItems[project][id].assemblyConnections.fasteners;
    Object.entries(fasteners).forEach(([key, value]) => {
      request.push({
        id: key,
        project: "fasteners",
        quantity: value,
        otherType: true
      });
    });
    return this['update/cart'](request);
  },
  'auth': function (data){
    let userName = data.username.toLowerCase();
    if(users[userName] && users[userName].passwd === data.password){
      token = userName;
      return {token};
    }else{
      return false;
    }
  },
  'user/me': function (){
    let user = users[token];
    if(user){
      return user;
    }else{
      return false;
    }
  },
  'register': function (data){
    if(users[data.username]){
      return {err: 'Такой пользователь уже существует'};
    }else{
      users[data.username] = {
        name: data.username,
        email: data.username,
        passwd: data.password,
        pic: 'my-project.png'
      };
      return {success: 'Пользователь зарегистрирован'}
    }
  },
  'menu/top': function (data){
    switch (data.route) {
      default:
        return [
          {
            name: 'Мой проект',
            link: '/my-project/all',
            icon: 'my-project.png'
          },
          {
            name: 'Статистика',
            link: '/statistic',
            icon: 'statistic-menu.png'
          },
          {
            name: 'Заказы',
            link: '/orders',
            icon: 'instruction.png'
          },
          // {
          //   name: 'Фильтр отображения',
          //   link: '/',
          //   icon: 'filter-menu.png',
          // },
        ]
        break;
    }
  },
  'menu/bottom': function (data){
    switch (data.route) {
      default:
        return [
          {
            name: 'О нас',
            link: '/about',
          },
          {
            name: 'Оплата и доставка',
            link: '/payment-and-shipping',
          },
          {
            name: 'Контакты',
            link: '/contacts',
          },
          {
            name: 'Как пользоваться приложением',
            link: '/how-to-use-app',
          },
          {
            name: 'Оставить заявку',
            link: '/',
          },
          {
            name: '8 (800) 888-88-88',
            link: 'tel:88008888888',
          },
        ]
        break;
    }
  },
  'get/items': function ({project, items, scope, upper}){
    let currentProjectItems = myProjectItems[project];
    if(!currentProjectItems && !upper) return {notFound: true};
    
    if(upper){
      currentProjectItems = myProjectItemsUpper;
    }

    let resp = {};
    let scopedItems = [];
    let notFound = false;
    items.forEach(element => {
      if(currentProjectItems[element]){
        let elementFromDB = currentProjectItems[element];
        resp[element] = elementFromDB;
        if(scope){
          scopedItems = [...scopedItems, ...currentProjectItems[element].bindings.childs];
        }
      }else{
        notFound = true;
      }
    });
    scopedItems.forEach(element => {
      if(currentProjectItems[element]){
        let elementFromDB = currentProjectItems[element];
        if(!elementFromDB) notFound = true;
        resp[element] = elementFromDB;
      }else{
        notFound = true;
      }
    });
    if(notFound) return {notFound: true};
    return resp;
  },
  'get/catalog/items': function ({project, items, scope}){
    let currentProjectCatalogItems = catalogItems[project];
    if(!currentProjectCatalogItems) return {notFound: true};
    let resp = {};
    let scopedItems = [];
    items.forEach(element => {
      if(currentProjectCatalogItems[element]){
        let elementFromDB = currentProjectCatalogItems[element];
        resp[element] = elementFromDB;
        if(scope){
          //scopedItems = [...scopedItems, ...catalogItems[element].bindings.childs];
        }
      }
    });
    scopedItems.forEach(element => {
      if(currentProjectCatalogItems[element]){
        resp[element] = currentProjectCatalogItems[element];
      }
    });
    return resp;
  },
  'get/necessary/details': function ({project, items}){
    let myProjectItemsWithProject = myProjectItems[project];
    let resp = {};
    let details = myProjectItemsWithProject[items[0]].assemblyConnections.details;

    Object.entries(details).forEach(([key, value])=> {
      resp[key] = {
        name: myProjectItemsWithProject[key].name,
        picture: myProjectItemsWithProject[key].pictures.preview,
        quantity: myProjectItemsWithProject[key].quantity.needed,
        price: catalogItems[project][key].price
      };
    });
    return resp;
  },
  'get/necessary/fasteners': function ({project, items}){
    let myProjectItemsWithProject = myProjectItems[project];
    let resp = {};
    let details = myProjectItemsWithProject[items[0]].assemblyConnections.fasteners;

    Object.entries(details).forEach(([key, value])=> {
      resp[key] = {
        name: fasteners[key].name,
        picture: fasteners[key].pictures.preview,
        quantity: myProjectItemsWithProject[items[0]].assemblyConnections.fasteners[key],
        price: catalogFasteners[key].price
      };
    });
    return resp;
  },
  'get/necessary/quantity': function ({project, items}){
    let details = 0;
    let fasteners = 0;
    Object.entries(this['get/necessary/details']({project, items})).forEach(([key, value]) => {
      details += value.quantity;
    });
    Object.entries(this['get/necessary/fasteners']({project, items})).forEach(([key, value]) => {
      fasteners += value.quantity;
    });
    return {details, fasteners};
  },
  'get/construction/items': function ({project, items}){
    if(!constructionItems[project]) return {notFound: true};
    return {[items[0]]: Object.assign({}, constructionItems[project][items[0]])};
  },
  'get/instructions/preview': function ({items}){
    let instructions = {};
    items.forEach((item) => {
      let obj = instructionsData[item].preview;
      obj.name = instructionsData[item].name;
      obj.link = item;
      instructions[item] = instructionsData[item].preview;
    })
    return {instructions};
  },
  'get/instructions/instruction': function ({items}){
    if(instructionsData[items[0]])
      return {[items[0]]: instructionsData[items[0]]};
    else
      return {notFound: true};
  },
  'set/status/maked': function ({project, item, status}){
    constructionItems[project][item].status = parseInt(status);
    return {success: true};
  },
  'get/statistic/items': function ({items, project}){
    if(!statisticItems[project]) return {notFound: true};
    let statistics = {};
    items.forEach((item) => {
      statistics[item] = statisticItems[project][item];
    })
    return statistics;
  },
  'get/projects': function ({items}){
    return projects;
  },
};

const apiCall = ({url, data, method}) => new Promise((resolve, reject) => {
  setTimeout(() => {
    let resp = apiUrl[url](data);
    
    if(resp){
      resolve(resp);
    }else{
      reject("err");
    }
  }, 100)
})

export default apiCall
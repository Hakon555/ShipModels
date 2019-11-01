import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import MyProject from './views/MyProject.vue'
import InstructionsPage from './views/InstructionsPage.vue'
import MyProjectItems from './views/MyProjectItems.vue'
import MyProjectCatalog from './views/MyProjectCatalog.vue'
import MyProjectConstruction from './views/MyProjectConstruction.vue'
import MyProjectStatistic from './views/MyProjectStatistic.vue'
import Cart from './views/Cart.vue'
import InDeveloping from './views/InDeveloping.vue'
import NotFoundComponent from './views/NotFoundComponent.vue'
import store from '@/store/store.js'

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/');
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/my-project/:projectName',
      name: 'my-project',
      component: MyProject,
    },
    {
      path: '/my-project',
      name: 'my-project-items',
      component: MyProjectItems,
      children: [
        {
          path: 'catalog/:projectName/:id',
          name: 'my-project-catalog',
          component: MyProjectCatalog,
          meta: {
            path: "/my-project/catalog"
          }
        },
        {
          path: 'construction/:projectName/:id',
          name: 'my-project-construction',
          component: MyProjectConstruction,
          meta: {
            path: "/my-project/construction"
          },
          beforeEnter: ifAuthenticated
        },
        {
          path: 'statistic/:projectName/:id',
          name: 'my-project-statistic',
          component: MyProjectStatistic,
          meta: {
            path: "/my-project/statistic"
          },
          beforeEnter: ifAuthenticated
        },
      ],
      beforeEnter: (to, from, next) => {
        if(!Object.keys(to.params).length)
          next('/my-project/all');
        else{
          next();
        }
      }
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: InDeveloping,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/instructions/:id',
      name: 'instructions',
      component: InstructionsPage,
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: InDeveloping
    },
    {
      path: '/orders',
      name: 'orders',
      component: InDeveloping
    },
    {
      path: '/about',
      name: 'about',
      component: InDeveloping
    },
    {
      path: '/payment-and-shipping',
      name: 'payment-and-shipping',
      component: InDeveloping
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: InDeveloping
    },
    {
      path: '/how-to-use-app',
      name: 'how-to-use-app',
      component: InDeveloping
    },
    { path: '*', component: NotFoundComponent }
  ]
})

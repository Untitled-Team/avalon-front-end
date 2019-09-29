import Vue from 'vue'
import Router from 'vue-router'
import Avalon from "./views/Avalon"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Avalon
    }
  ]
})

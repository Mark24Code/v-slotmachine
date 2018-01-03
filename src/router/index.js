import Vue from 'vue'
import Router from 'vue-router'
import Sample from '@/pages/Sample'
import thirdprize from '@/pages/thirdprize'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Sample',
      component: Sample
    },
    {
      path: '/thirdprize',
      name: 'thirdprize',
      component: thirdprize
    }
  ]
})

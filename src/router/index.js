import Vue from 'vue'
import Router from 'vue-router'
import Sample from '@/pages/Sample'
import thirdprize from '@/pages/thirdPrize'
import secondprize30 from '@/pages/secondPrize30'
import secondprize20 from '@/pages/secondPrize20'
import firstprize from '@/pages/firstPrize'
import specialprize from '@/pages/specialPrize'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'thirdprize' }
    },{
      path: '/thirdprize',
      name: 'thirdprize',
      component: thirdprize
    },{
      path: '/secondprize30',
      name: 'secondprize30',
      component: secondprize30
    },{
      path: '/secondprize20',
      name: 'secondprize20',
      component: secondprize20
    },{
      path: '/firstprize',
      name: 'firstprize',
      component: firstprize
    },{
      path: '/specialprize',
      name: 'specialprize',
      component: specialprize
    },
  ]
})

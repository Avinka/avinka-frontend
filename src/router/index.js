import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Demo06 from '@/components/Demo06';
import DataAdmin from '@/components/DataAdmin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/demo06',
      name: 'Demo06',
      component: Demo06
    }, {
      path: '/data-admin',
      name: 'DataAdmin',
      component: DataAdmin
    }
  ]
});

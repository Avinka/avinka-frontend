import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/public/components/Home';
import DashboardOverview from '@/public/components/DashboardOverview';
import DataAdmin from '@/public/components/DataAdmin';
import DashboardDetail from '@/public/components/DashboardDetail';
import Objects from '@/public/components/Objects';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/analytics/',
      name: 'DashboardOverview',
      component: DashboardOverview
    }, {
      path: '/analytics/dashboards/:id',
      name: 'DashboardDetail',
      component: DashboardDetail
    }, {
      path: '/analytics/objects',
      name: 'Objects',
      component: Objects
    }, {
      path: '/analytics/data-admin',
      name: 'DataAdmin',
      component: DataAdmin
    }
  ]
});

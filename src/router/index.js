import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Dashboard from '@/components/Dashboard';
import DataAdmin from '@/components/DataAdmin';
import Objects from '@/components/Objects';
import AnalyticsOverview from '@/components/AnalyticsOverview';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/analytics/',
      name: 'AnalyticsOverview',
      component: AnalyticsOverview
    }, {
      path: '/analytics/dashboards',
      name: 'Dashboard',
      component: Dashboard
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

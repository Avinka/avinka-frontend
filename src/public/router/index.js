import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import DashboardOverview from '../components/DashboardOverview';
import DataAdmin from '../components/DataAdmin';
import DashboardDetail from '../components/DashboardDetail';
import Objects from '../components/Objects';

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

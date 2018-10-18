import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import DashboardOverview from '@/components/DashboardOverview';
import DashboardDetail from '@/components/DashboardDetail';
import Admin from '@/components/Admin';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      // redirect: { name: 'Home' }
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
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
});

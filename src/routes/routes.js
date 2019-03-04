import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
import Appointments from 'src/components/Dashboard/Views/Appointments.vue'
import Consults from 'src/components/Dashboard/Views/Consults.vue'
import Encounters from 'src/components/Dashboard/Views/Encounters.vue'
import Providers from 'src/components/Dashboard/Views/Providers.vue'
import Surveys from 'src/components/Dashboard/Views/Surveys.vue'
import EBP from 'src/components/Dashboard/Views/EBP.vue'

import Icons from 'src/components/Dashboard/Views/Icons.vue'

// import store to trigger get data action
import store from '@/store/store'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    redirect: '/admin/overview'
  },
  {
    path: '/admin',
    component: DashboardLayout,
    redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'consults',
        name: 'Consults',
        component: Consults
      },
      {
        path: 'appointments',
        name: 'Cancel No Show',
        component: Appointments
      },
      {
        path: 'encounters',
        name: 'Encounters',
        component: Encounters
      },
      {
        path: 'providers',
        name: 'Providers',
        component: Providers
      },
      {
        path: 'surveys',
        name: 'Surveys',
        component: Surveys
      },
      {
        path: 'ebp',
        name: 'EBP',
        component: EBP
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      // {
      //   path: 'user',
      //   name: 'User',
      //   component: UserProfile
      // },
      // {
      //   path: 'table-list',
      //   name: 'Table List',
      //   component: TableList
      // },
      // {
      //   path: 'typography',
      //   name: 'Typography',
      //   component: Typography
      // },
      // {
      //   path: 'icons',
      //   name: 'Icons',
      //   component: Icons
      // },
      // {
      //   path: 'maps',
      //   name: 'Maps',
      //   component: Maps
      // },
      // {
      //   path: 'notifications',
      //   name: 'Notifications',
      //   component: Notifications
      // }
    ]
  },
  { path: '*', component: NotFound }
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
**/
// function view(name) {
//    var res= require('../components/Dashboard/Views/' + name + '.vue');
//    return res;
// };

export default routes

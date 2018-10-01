import DashboardLayout from '../components/Dashboard/Layout/DashboardLayout.vue'
// GeneralViews
import NotFound from '../components/GeneralViews/NotFoundPage.vue'

// Admin pages
import Overview from 'src/components/Dashboard/Views/Overview.vue'
// import Consults from 'src/components/Dashboard/Views/Consults.vue'
// import Encounters from 'src/components/Dashboard/Views/Encounters.vue'
// import Providers from 'src/components/Dashboard/Views/Providers.vue'
// import Surveys from 'src/components/Dashboard/Views/Surveys.vue'
// import EBP from 'src/components/Dashboard/Views/EBP.vue'

// lazy load page views
const Consults = () => import('src/components/Dashboard/Views/Consults.vue')
const Encounters = () => import('src/components/Dashboard/Views/Encounters.vue')
const Providers = () => import('src/components/Dashboard/Views/Providers.vue')
const Surveys = () => import('src/components/Dashboard/Views/Surveys.vue')
const EBP = () => import('src/components/Dashboard/Views/EBP.vue')

// import UserProfile from 'src/components/Dashboard/Views/UserProfile.vue'
// import TableList from 'src/components/Dashboard/Views/TableList.vue'
// import Typography from 'src/components/Dashboard/Views/Typography.vue'
// import Icons from 'src/components/Dashboard/Views/Icons.vue'
// import Maps from 'src/components/Dashboard/Views/Maps.vue'
// import Notifications from 'src/components/Dashboard/Views/Notifications.vue'

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

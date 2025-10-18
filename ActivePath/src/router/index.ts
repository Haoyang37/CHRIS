import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import ProgramView from '../views/ProgramView.vue'
import CommunityView from '../views/CommunityView.vue'
import ResourcesView from '../views/ResourcesView.vue'
import AccountView from '../views/AccountView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/program',
      name: 'program',
      component: ProgramView,
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitiesView,
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    },
    {
      path: '/resources',
      name: 'resources',
      component: ResourcesView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      meta: { requiresAdmin: true }
    },
  ],
})

// Route guards
router.beforeEach((to, from, next) => {
  const { user } = useUserStore()
  
  // Check if route requires admin access
  if (to.meta.requiresAdmin) {
    if (!user.isLoggedIn) {
      // User not logged in, redirect to login
      next('/login')
    } else if (user.userType !== 'admin') {
      // User logged in but not admin, redirect to home
      alert('Access denied. Administrator privileges required.')
      next('/')
    } else {
      // User is admin, allow access
      next()
    }
  } else {
    // Route doesn't require admin access, allow
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router';

const IndexView = () => import('../views/IndexView.vue');
const LoginView = () => import('../views/LoginView.vue');

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.eleme_login ? true : false;
  if (to.path === '/login') {
    next();
  } else {
    if (isLoggedIn) {
      next();
    } else {
      next('/login');
    }
  }
})

export default router

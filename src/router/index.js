import { createRouter, createWebHistory } from 'vue-router';

const IndexView = () => import('../views/IndexView.vue');
const LoginView = () => import('../views/LoginView.vue');
const HomeView = () => import('../views/HomeView.vue');
const SocialView = () => import('../views/SocialView.vue');
const OrderView = () => import('../views/OrderView.vue');
const ProfileView = () => import('../views/ProfileView.vue');
const AddressView = () => import('../views/location/AddressView.vue');
const LocateView = () => import('../views/location/LocateView.vue');
const CityView = () => import('../views/location/CityView.vue');
const SearchView = () => import('../views/SearchView.vue');
const ShopView = () => import('../views/shops/ShopView.vue');
const MenuView = () => import('../views/shops/MenuView.vue');
const CommentView = () => import('../views/shops/CommentView.vue');
const SellerView = () => import('../views/shops/SellerView.vue');
const FoodDetailsView = () => import('../views/shops/FoodDetailsView.vue');

const routes = [
  {
    path: '/',
    name: 'index',
    component: IndexView,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeView
      },
      {
        path: 'social',
        name: 'social',
        component: SocialView
      },
      {
        path: 'order',
        name: 'order',
        // login required
        component: OrderView
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileView,
        // children: [
        //   {
        //     path: '/:userId',
        //     // login required
        //   }
        // ]
      },

    ]
  },
  {
    path: '/address',
    name: 'address',
    component: AddressView,

  },
  {
    path: '/locate',
    name: 'locate',
    component: LocateView,
  },
  {
    path: '/city',
    name: 'city',
    component: CityView,
  },

  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    // consider adding a conditional check if db is completed
    path: '/shop/:shopId',
    name: 'shop',
    redirect: { name: 'menu' },
    component: ShopView,
    children: [
      {
        path: 'menu',
        name: 'menu',
        component: MenuView,
      },
      {
        path: 'menu/:foodId',
        name: 'foodDetails',
        component: FoodDetailsView,
        props: true,
        // meta: { transition: 'slide' },
      },

      {
        path: 'reviews',
        name: 'reviews',
        component: CommentView
      },
      {
        path: 'seller',
        name: 'seller',
        component: SellerView
      },
    ]
  },
  // {
  //   path: '/shop/menu/:foodId',
  //   name: 'foodDetails',
  //   component: FoodDetails,
  //   props: true

  // },

]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
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

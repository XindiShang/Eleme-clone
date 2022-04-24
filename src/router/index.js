import { createRouter, createWebHistory } from "vue-router";

const IndexView = () => import("../pages/IndexView.vue");
const LoginView = () => import("../pages/LoginView.vue");
const HomeView = () => import("../pages/HomeView.vue");
const SocialView = () => import("../pages/SocialView.vue");
const AllOrders = () => import("../pages/AllOrders.vue");
const UserProfile = () => import("../pages/profile/UserProfile.vue");

// *** location ***
const AddressSelect = () => import("../pages/location/AddressSelect.vue");
// const AddressSearch = () => import("../pages/location/AddressSearch.vue");
// const AllCities = () => import("../pages/location/AllCities.vue");
const SearchShops = () => import("../pages/SearchShops.vue");

// *** shop ***
const TheShop = () => import("../pages/shops/TheShop.vue");
const ShopMenu = () => import("../pages/shops/ShopMenu.vue");
const AllReviews = () => import("../pages/shops/AllReviews.vue");
const ShopDetails = () => import("../pages/shops/ShopDetails.vue");
const FoodDetails = () => import("../pages/shops/FoodDetails.vue");

// *** order ***
const ShopCheckout = () => import("../pages/orders/ShopCheckout.vue");

// *** user address ***
const AllAddresses = () => import("../pages/profile/AllAddresses.vue");
// const ManageAddress = () => import("../pages/profile/ManageAddress.vue");
// const ConfirmAddress = () => import("../pages/profile/ConfirmAddress.vue");

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexView,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "social",
        name: "social",
        component: SocialView,
      },
      {
        path: "order",
        name: "order",
        // login required
        component: AllOrders,
      },
      {
        path: "profile",
        name: "profile",
        component: UserProfile,
      },
      {
        path: "profile/:userId",
        name: "matchedProfile",
        props: true,
        component: UserProfile,
      },
    ],
  },
  // *** user address ***
  {
    path: "/profile/:userId/address",
    name: "userAddress",
    props: true,
    component: AllAddresses,
  },
  // {
  //   path: "/profile/:userId/address/new",
  //   name: "userNewAddress",
  //   props: true,
  //   component: ManageAddress,
  // },
  // {
  //   path: "/profile/:userId/address/confirm",
  //   name: "userConfirmAddress",
  //   props: true,
  //   component: ConfirmAddress,
  // },
  // {
  //   path: "/profile/:userId/address/:addressId/edit",
  //   name: "userEditAddress",
  //   props: true,
  //   component: ManageAddress,
  // },
  // *** location ***
  {
    path: "/address",
    name: "address",
    component: AddressSelect,
  },
  // {
  //   path: "/locate",
  //   name: "locate",
  //   component: AddressSearch,
  // },
  // {
  //   path: "/city",
  //   name: "city",
  //   component: AllCities,
  // },
  // *** shop search ***
  {
    path: "/search",
    name: "search",
    component: SearchShops,
  },
  {
    // consider adding a conditional check if db is completed
    path: "/shop/:shopId",
    name: "shop",
    redirect: { name: "menu" },
    component: TheShop,
    children: [
      {
        path: "menu",
        name: "menu",
        component: ShopMenu,
      },
      {
        path: "menu/:foodId",
        name: "foodDetails",
        component: FoodDetails,
        props: true,
      },
      {
        path: "reviews",
        name: "reviews",
        component: AllReviews,
      },
      {
        path: "seller",
        name: "seller",
        component: ShopDetails,
      },
    ],
  },
  // *** orders *** 
  {
    path: "/shop/:shopId/checkout",
    name: "shopCheckout",
    props: true,
    component: ShopCheckout,
    meta: { transition: 'slide' },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.eleme_login ? true : false;
  if (to.path === "/login") {
    next();
  } else {
    if (isLoggedIn) {
      next();
    } else {
      next("/login");
    }
  }
});

export default router;

<template>
  <div class="skeleton">
    <section class="skeleton-bg"></section>
    <section class="skeleton-card lift-area">
      <div class="shop-intro">
        <div class="card-wrapper">
          <div class="card">
            <div class="card-top mb-2">
              <div class="card-top--left">
                <div class="animate row-h-3 row-w-100 mb-2"></div>
                <div class="animate row-h-1 row-w-70"></div>
              </div>
              <div class="card-top--right animate"></div>
            </div>

            <div class="card-bottom">
              <div class="animate row-h-1 row-w-50 mb-2"></div>
              <div class="animate row-h-3 row-w-70 mb-2"></div>
              <div class="animate row-h-1 row-w-100 mb-2"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="skeleton-nav lift-area">
      <div class="nav-left">
        <div class="nav-item-container animate mr-2"></div>
        <div class="nav-item-container animate mr-2"></div>
        <div class="nav-item-container animate mr-2"></div>
      </div>
      <div class="nav-right">
        <div class="nav-btn animate"></div>
      </div>
    </section>
    <section class="skeleton-main lift-area">
      <div class="menu-sidebar animate"></div>
      <div class="menu-body">
        <div class="category-title animate row-h-1 row-w-20"></div>
        <div class="menu-body-item">
          <div class="body-item--left animate"></div>
          <div class="body-item--right">
            <div class="row-h-2 row-w-100 animate mb-2"></div>
            <div class="row-h-1 row-w-70 animate mb-2"></div>
            <div class="align-bottom body-item-action">
              <div class="animate row-h-2 row-w-20"></div>
              <div class="animate circle"></div>
            </div>
          </div>
        </div>

        <div class="menu-body-item">
          <div class="body-item--left animate"></div>
          <div class="body-item--right">
            <div class="row-h-2 row-w-100 animate mb-2"></div>
            <div class="row-h-1 row-w-70 animate mb-2"></div>
            <div class="align-bottom body-item-action">
              <div class="animate row-h-2 row-w-20"></div>
              <div class="animate circle"></div>
            </div>
          </div>
        </div>

        <div class="menu-body-item">
          <div class="body-item--left animate"></div>
          <div class="body-item--right">
            <div class="row-h-2 row-w-100 animate mb-2"></div>
            <div class="row-h-1 row-w-70 animate mb-2"></div>
            <div class="align-bottom body-item-action">
              <div class="animate row-h-2 row-w-20"></div>
              <div class="animate circle"></div>
            </div>
          </div>
        </div>

        <div class="menu-body-item">
          <div class="body-item--left animate"></div>
          <div class="body-item--right">
            <div class="row-h-2 row-w-100 animate mb-2"></div>
            <div class="row-h-1 row-w-70 animate mb-2"></div>
            <div class="align-bottom body-item-action">
              <div class="animate row-h-2 row-w-20"></div>
              <div class="animate circle"></div>
            </div>
          </div>
        </div>

        <div class="menu-body-item">
          <div class="body-item--left animate"></div>
          <div class="body-item--right">
            <div class="row-h-2 row-w-100 animate mb-2"></div>
            <div class="row-h-1 row-w-70 animate mb-2"></div>
            <div class="align-bottom body-item-action">
              <div class="animate row-h-2 row-w-20"></div>
              <div class="animate circle"></div>
            </div>
          </div>
        </div>

        <div class="menu-body-item">
          <div class="body-item--left animate"></div>
          <div class="body-item--right">
            <div class="row-h-2 row-w-100 animate mb-2"></div>
            <div class="row-h-1 row-w-70 animate mb-2"></div>
            <div class="align-bottom body-item-action">
              <div class="animate row-h-2 row-w-20"></div>
              <div class="animate circle-sm"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="skeleton-cart">
      <div class="cart-left">
        <div class="circle-lg animate mr-2"></div>
        <div class="rows-container">
          <div class="animate row-h-2 row-w-70 mb-1"></div>
          <div class="animate row-h-1 row-w-100"></div>
        </div>
      </div>
      <div class="cart-right"></div>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.skeleton {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.skeleton-bg {
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 14vh;
  max-height: 10rem;
  background: linear-gradient(to bottom, #a6a6a6, #d5d5d5);
}

.lift-area {
  position: relative;
  bottom: 6%;
}

.skeleton-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  background: white;
  z-index: 10;
  padding: 6px 16px;
  height: 36px;
  margin-bottom: 4px;
}

.nav-left {
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  width: 60%;
  height: 100%;
}

.nav-right {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.nav-item-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 80%;
  width: 20%;
}

.nav-btn {
  height: 80%;
  width: 100%;
}

.shop-intro {
  width: 100%;
  height: 40vw;
  max-height: 180px;
  box-sizing: border-box;
  margin-bottom: 4px;
}

.card-wrapper {
  padding: 2px 12px;
  height: 100%;
}

.card {
  width: 100%;
  height: 100%;
  padding: 2%;
  border-radius: 6px;
  -webkit-box-shadow: 1px 0px 4px -1px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 0px 4px -1px rgba(0, 0, 0, 0.3);
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
}

.card-top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.card-top--left {
  width: 70%;
}

.skeleton-main {
  width: 100%;
  height: 100%;
  display: flex;
}

.menu-sidebar {
  overflow-y: auto;
  height: 100%;
  width: 20%;
  min-width: 80px;
  max-width: 180px;
  overflow: scroll;
}

.menu-body {
  width: 80%;
  height: 100%;
  background-color: #fff;
  padding: 2vw 12px;
}

.menu-body-item {
  width: 100%;
  height: 80px;
  margin: 12px 0 20px;
  display: flex;
  position: relative;
  box-sizing: border-box;
}

.body-item--left {
  width: 80px;
  height: 80px;
  border-radius: 6px;
  margin-right: 8px;
}
.body-item--right {
  width: 70%;
}

.body-item-action {
  display: flex;
  justify-content: space-between;
  width: 70%;
}

.skeleton-cart {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  height: 7vh;
  z-index: 6;
  padding: 2px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cart-left {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.cart-right {
  width: 30%;
  height: 4.4vh;
  background-color: #47b6fd;
  border-radius: 200px;
}

.rows-container {
  width: 50%;
}
.align-bottom {
  position: absolute;
  bottom: 0;
}

.animate {
  animation: breathe 1.2s ease-in-out infinite;
}

.circle-sm {
  border-radius: 50%;
  height: 1.9vh;
  width: 1.9vh;
}

.circle-lg {
  border-radius: 50%;
  height: 4.4vh;
  width: 4.4vh;
}

.row-h-3 {
  height: 2.26vh;
}

.row-h-2 {
  height: 1.9vh;
}

.row-h-1 {
  height: 1.5vh;
}

.row-w-full {
  width: 100%;
}

.row-w-70 {
  width: 70%;
}

.row-w-50 {
  width: 50%;
}

.row-w-20 {
  width: 20%;
}

.card-top--right {
  background-color: #f6f6f6;
  width: 40px;
  height: 40px;
  border-radius: 6px;
}

.mb-1 {
  margin-bottom: 4px;
}

.mb-2 {
  margin-bottom: 6px;
}

.mr-2 {
  margin-right: 6px;
}

@keyframes breathe {
  from {
    background-color: #f6f6f6;
  }

  to {
    background-color: #efefef;
  }
}
</style>

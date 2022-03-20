<template>
    <div class="tab-bar">
        <router-link
            class="tab-item"
            v-for="(tab, i) in tabs"
            :key="i"
            :to="tab.path"
            exact-active-class="is-selected"
        >

        <div class="tab-set">
            <div class="tab-item-icon">
                <img id="home-logo" v-if="tab.useImg" src="../assets/homeLogo.svg" alt="eleme logo here"  />
                <span v-else class="material-icons">{{tab.icon}}</span>
            </div>

            <div class="tab-item-label">{{tab.label}}</div>
        </div>
            

        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        tabs: Array,
    }
}
</script>

<style scoped>
.tab-bar {
  height: 60px;
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-image: linear-gradient(
    180deg,
    #d9d9d9,
    #d9d9d9 50%,
    transparent 0
  );
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-color: #fafafa;
  display: flex;
  text-align: center;
  align-items: center;
}
.tab-item {
  /* display: block; */
  padding: 3px 0;
  flex: 1;
}
.tab-item-icon {
  width: 26px;
  height: 26px;
  margin: 0 auto 5px;
}
.tab-item-icon span {
  font-size: 32px;
  position: relative;
  right: 2px;
  bottom: 2px;
}
.tab-item-label {
  color: inherit;
  font-size: 8px;
  
  /* line-height: 1; */
}
a {
  text-decoration: none;
  color: #999;
  height: 40px;
}
.is-selected {
  color: #009eef;
}

#home-logo {
    border-radius: 100%;
    width: 100%;
}

.tab-set {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
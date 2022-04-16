<template>
  <section class="profile-header">
    <div class="header-content-wrapper">
      <div class="header-content">
        <div class="user-container">
          <div class="avatar-container">
            <van-image class="avatar" radius="50" :src="require('@/assets/homeLogo.svg')"></van-image>
          </div>
          <span v-if="isLoggedIn" class="user-text user-phone">{{ encryptedPhone }}</span>
          <span v-else @click="switchLoginPage" class="user-text login-text">立即登录</span>
        </div>
        <div class="settings-container">
          <van-popover v-model:show="showPopover" theme="dark" :actions="actions" @select="logUserOut">
            <template #reference>
              <span class="settings-icon material-icons-outlined">
                settings
              </span>
            </template>
          </van-popover>


          <span class="message-icon material-icons-outlined">
            textsms
          </span>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
export default {
  data() {
    return {
      isLoggedIn: this.$route.params.userId,
      phone: this.$store.getters.phone,
      showPopover: false,
      actions: [
        {'text': '退出登录'}
      ]
    }
  },
  computed: {
    encryptedPhone() {
      return this.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    }
  },
  methods: {
    switchLoginPage() {
      this.$router.push({ name: 'login', query: { redirect: 'matchedProfile' } })
    },
    logUserOut(){
      this.$store.dispatch('callLogout');
      this.$router.replace('/profile')
    }
  },
  mounted() {
    console.log(this.$store.getters.userId)
    console.log(this.$store.getters.phone)
  }


}
</script>

<style scoped>
.profile-header {
  margin-bottom: 6px;
}

.header-content-wrapper {
  padding: 8px 16px;
  background-color: #f8f8f8;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 8px;
}

.avatar {
  width: 30px;
}

.user-text {
  font-weight: bold;
  font-size: 1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.settings-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
}

.message-icon {
  margin-left: 14px;
}
</style>
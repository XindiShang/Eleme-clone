<template>
  <div v-if="!isEmpty" class="address-item">
    <div class="address-title">
      <van-tag
        v-if="address.tag"
        class="mr-1"
        color="#e5f7fd"
        text-color="#5cc8f7"
        >{{ address.tag }}</van-tag
      >
      <span :class="{ 'name-large': nameLarge }" class="mr-1 address-name"
        >{{ address.address }}
        <span class="address-specific" v-if="address.addressSpecific">{{
          address.addressSpecific
        }}</span>
      </span>
    </div>
    <div class="address-description">
      <span class="mr-1"
        >{{ address.recipientName }}
        <span v-if="address.gender" class="gender"
          >({{ formatGender(address.gender) }})</span
        >
      </span>
      <span class="phone">{{ address.phone }}</span>
    </div>
  </div>
  <div v-else class="address-item">
    <div class="address-title">
      <span class="name-large address-name">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["address", "nameLarge", "isEmpty", "title"],
  computed: {
    formatGender() {
      return (gender) => (gender === "female" ? "女士" : "先生");
    },
  },
  methods: {},
};
</script>

<style scoped>
.address-item {
  width: 100%;
}

.address-title {
  width: 80%;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 0.9rem;
  margin-bottom: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.address-name {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
}

.address-specific {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1;
}

.name-large {
  font-size: 1.1rem;
}

.address-description {
  font-size: 0.85rem;
  color: #999999;
}

.mr-1 {
  margin-right: 4px;
}
</style>

<template>
  <div class="user-address-manage-view">
    <base-util-header class="header-fixed" bgColor="white" @go-back="switchPageBack" :headerTitle="headerTitle" />

    <div class="address-manage-body">
      <div class="address-manage-form-wrapper">
        <form class="address-manage-form">

          <div class="card">
            <!-- address  -->
            <form-cell v-model="addressVal" @clear-val="clearInput('地址')" label="地址" input-id="address"
              :has-arrow="true" placeholder="选择收货地址" :is-full-length="true">
            </form-cell>

            <!-- address specific  -->
            <form-cell v-model="addressSpecificVal" @clear-val="clearInput('门牌号')" label="门牌号"
              input-id="addressSpecific" placeholder="填写详细地址，例：1层101" :is-full-length="true">
            </form-cell>

            <!-- tag -->
            <form-cell label="标签" :is-customized="true" :is-end="true">
              <template #default>
                <div class="tags-container">
                  <van-tag @click="selectTag(tag)" :class="{ 'tag-selected': this.selectedTag === tag }"
                    class="base-tag" :plain="!tagSelected" v-for="(tag, i) in tags" :key="i" size="medium">{{ tag }}
                  </van-tag>
                </div>
              </template>
            </form-cell>
          </div>

          <div class="card">
            <!-- recipient  -->
            <form-cell v-model="recipientNameVal" @clear-val="clearInput('收货人')" label="收货人" input-id="recipientName"
              :is-half-length="true" placeholder="姓名">
              <template #rightSlot>
                <div class="gender-selector">
                  <div class="selector-item">
                    <input class="radio-btn" type="radio" name="gender" value="male" id="male">
                    <label class="radio-label" for="male">先生</label>
                  </div>

                  <div class="selector-item">
                    <input class="radio-btn" type="radio" name="gender" value="female" id="female">
                    <label class="radio-label" for="female">女士</label>
                  </div>
                </div>
              </template>
            </form-cell>


            <!-- phone number  -->
            <form-cell v-model="phoneVal" @clear-val="clearInput('手机号')" label="手机号" input-id="phone"
              input-type="number" placeholder="收货人手机号码" :is-full-length="true" :is-end="true">
            </form-cell>
          </div>

        </form>

      </div>
    </div>


  </div>

</template>

<script>
import BaseUtilHeader from "@/components/BaseUtilHeader.vue";
import FormCell from "@/components/profile/FormCell.vue"

export default {
  components: {
    BaseUtilHeader,
    FormCell
  },
  data() {
    return {
      tags: ['家', '公司', '学校'],
      addressVal: '',
      addressSpecificVal: '',
      selectedTag: '',
      recipientNameVal: '',
      phoneVal: ''


    }
  },
  computed: {
    headerTitle() {
      return '新增收货地址'
    },
    tagSelected(tag) {
      return this.selectedTag === tag;
    },

  },
  methods: {
    switchPageBack() {
      this.$router.back();
    },
    selectTag(tag) {
      this.selectedTag = tag;
    },
    clearInput(label) {
      if (label === '地址') {
        this.addressVal = '';
      } else if (label === '门牌号') {
        this.addressSpecificVal = '';
      } else if (label === '收货人') {
        this.recipientNameVal = '';
      } else if (label === '手机号') {
        this.phoneVal = '';
      } else {
        return;
      }
    },
    submitForm(){},
    validateForm(){}
    // addNewAddress() {
    //   this.$router.push({ name: 'userAddAddress' });
    // }
  },

}
</script>

<style scoped>
.user-address-manage-view {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}

.header-fixed {
  position: fixed;
  top: 0;
  z-index: 1;
}

.address-manage-body {
  position: absolute;
  top: 44px;
  width: 100%;
  height: 100%;
}

.card {
  margin: 0 16px 8px;
  /* background-color: #fff; */
  background-color: rgb(234, 192, 192);
  border-radius: 6px;
  padding: 12px;
}

.input-slot-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9b9b9b;
}

.base-tag {
  border-radius: 6px;
  padding: 4px 12px;
  margin-right: 4px;
}

.tag-selected {
  background-color: #e5f7fd;
  color: #5cc8f7;
  border: 1px solid #5cc8f7 outset;
}

.gender-selector {
  display: flex;
}

.selector-item {
  margin-right: 8px;
}

.radio-btn {
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
  position: absolute;
}

.radio-label {
  color: #333;
  line-height: 1.1rem;
}

.radio-btn+.radio-label:before {
  content: "";
  background: #f4f4f4;
  border-radius: 100%;
  border: 1px solid #b4b4b4;
  display: inline-block;
  width: 1.1em;
  height: 1.1em;
  top: 0.05rem;
  position: relative;
  margin-right: 4px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  transition: all 250ms ease;
}

.radio-btn:checked+.radio-label:before {
  background-color: #47b6fd;
  box-shadow: inset 0 0 0 4px #f4f4f4;
}

.radio-btn:focus+.radio-label:before {
  outline: none;
  border-color: #47b6fd;
}

.radio-btn:disabled+.radio-label:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  border-color: #b4b4b4;
  background: #b4b4b4;
}

.radio-btn+.radio-label:empty:before {
  margin-right: 0;
}
</style>
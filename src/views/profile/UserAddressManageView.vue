<template>
  <div class="user-address-manage-view">
    <base-util-header class="header-fixed" bgColor="white" @go-back="switchPageBack" :headerTitle="headerTitle" />

    <div class="address-manage-body">
      <div id="mapContainer"></div>

      <div class="address-manage-form-wrapper">
        <form @submit.prevent="submitForm" class="address-manage-form">

          <div class="card">
            <!-- address  -->
            <form-cell v-model="address.val" @clear-val="clearInput('地址')" @expand="addNewAddress" label="地址"
              input-id="address" :has-arrow="true" placeholder="选择收货地址" :is-full-length="true">
            </form-cell>

            <!-- address specific  -->
            <form-cell v-model="addressSpecific" @clear-val="clearInput('门牌号')" label="门牌号" input-id="addressSpecific"
              placeholder="填写详细地址，例：1层101" :is-full-length="true">
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
            <form-cell v-model="recipientName.val" @clear-val="clearInput('收货人')" label="收货人" input-id="recipientName"
              :is-half-length="true" placeholder="姓名">
              <template #rightSlot>
                <div class="gender-selector">
                  <div class="selector-item">
                    <input class="radio-btn" type="radio" name="gender" v-model="gender" value="male" id="male">
                    <label class="radio-label" for="male">先生</label>
                  </div>

                  <div class="selector-item">
                    <input class="radio-btn" type="radio" name="gender" v-model="gender" value="female" id="female">
                    <label class="radio-label" for="female">女士</label>
                  </div>
                </div>
              </template>
            </form-cell>


            <!-- phone number  -->
            <form-cell v-model="phone.val" @clear-val="clearInput('手机号')" label="手机号" input-id="phone"
              input-type="number" placeholder="收货人手机号码" :is-full-length="true" :is-end="true">
            </form-cell>

            <!-- submit  -->
            <button class="submit-btn" type="submit">保存</button>
          </div>

        </form>

      </div>
    </div>


  </div>

</template>

<script>
import BaseUtilHeader from "@/components/BaseUtilHeader.vue";
import FormCell from "@/components/profile/FormCell.vue";
import { Toast } from 'vant';
import AMap from 'AMap' // 引入高德地图

export default {
  components: {
    BaseUtilHeader,
    FormCell
  },
  data() {
    return {
      tags: ['家', '公司', '学校'],
      address: {
        val: this.$route.params.chosenAddress ? this.$route.params.chosenAddress : '',
        isValid: true,
        msg: ''
      },
      addressSpecific: '',
      selectedTag: '',
      recipientName: {
        val: '',
        isValid: true,
        msg: ''
      },
      phone: {
        val: '',
        isValid: true,
        msg: ''
      },
      gender: '',
      formIsValid: true,
      map: null,
      title: ''
    }
  },
  computed: {
    headerTitle() {
      this.getTitle();
      return this.title;
    },
    tagSelected(tag) {
      return this.selectedTag === tag;
    },
  },
  methods: {
    getTitle() {
      if (this.$route.name === 'userNewAddress') {
        this.title = '新增收货地址';
      } else {
        this.title = '编辑收货地址';
      }
    },
    switchPageBack() {
      this.$router.push({ name: 'userAddress', params: { userId: this.$route.params.userId } });
    },
    selectTag(tag) {
      if (this.selectedTag === tag) {
        this.selectedTag = ''
      } else {
        this.selectedTag = tag;

      }
    },
    clearInput(label) {
      if (label === '地址') {
        this.address.val = '';
      } else if (label === '门牌号') {
        this.addressSpecific = '';
      } else if (label === '收货人') {
        this.recipientName.val = '';
      } else if (label === '手机号') {
        this.phone.val = '';
      } else {
        return;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        addressId: new Date().toISOString(),
        recipientName: this.recipientName.val,
        phone: this.phone.val,
        address: this.address.val,
        addressSpecific: this.addressSpecific,
        tag: this.selectedTag,
        gender: this.gender
      }

      if (this.$route.name === 'userEditAddress') {
        this.$store.dispatch('getUpdatedAddress', formData)
      } else {
        this.$store.dispatch('getNewAddress', formData);
      }
      this.$router.push({ name: 'userAddress', params: { userId: this.$route.params.userId } })
    },
    validateForm() {
      this.formIsValid = true;
      if (this.recipientName.val === '') {
        this.recipientName.isValid = false;
        this.recipientName.msg = '请填写收货人';
        Toast(this.recipientName.msg)
        this.formIsValid = false;
      }
      if (this.address.val === '') {
        this.address.isValid = false;
        this.address.msg = '请填写收货地址'
        Toast(this.address.msg)
        this.formIsValid = false;
      }
      this.validatePhone();
    },
    validatePhone() {
      if (this.phone.val === '') {
        this.phone.isValid = false;
        this.phone.msg = '请填写联系电话'
        Toast(this.phone.msg)
        this.formIsValid = false;
      } else {
        if (!(/^1[345678]\d{9}$/.test(this.phone.val))) {
          this.phone.isValid = false;
          this.phone.msg = '请填写合法的手机号'
          Toast(this.phone.msg)
          this.formIsValid = false;
        }

      }
    },
    initMap() {
      this.map = new AMap.Map('mapContainer', {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: 11, //初始地图级别
        mapStyle: 'amap://styles/2de08eeb11b2025dc74ddede43708d08',
      })

      const that = this;

      AMap.plugin('AMap.Geolocation', function () {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000,          //超过10秒后停止定位，默认：5s
          buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
          showButton: false,
          // noIpLocate: 2
        });

        that.map.addControl(geolocation);
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });
      });
      //解析定位结果
      function onComplete(data) {
        var str = [];
        str.push('定位结果：' + data.position);
        str.push('定位类别：' + data.location_type);
        console.log(data)

      }
      //解析定位错误信息
      function onError(data) {
        console.log(data.message)
      }
    },
    addNewAddress() {
      this.$router.push({ name: 'userConfirmAddress' });
    }
  },
  mounted() {
    if (this.$route.name === 'userEditAddress') {
      const addresses = this.$store.getters.addresses;
      const target = addresses.find(el => el.addressId === this.$route.params.addressId)

      this.address.val = target.address;
      this.addressSpecific = target.addressSpecific;
      this.selectedTag = target.tag;
      this.recipientName.val = target.recipientName;
      this.gender = target.gender;
      this.phone.val = target.phone;
    }
    this.initMap();
  },
}
</script>

<style scoped>
#mapContainer {
  height: 150px;
  width: 100%;
}

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
  /* top: 100px; */
  width: 100%;
  height: calc(100% - 44px);
}

.address-manage-form-wrapper {
  position: absolute;
  /* z-index: 10000; */
  top: 100px;
  width: 100%;

}

.card {
  margin: 0 16px 8px;
  background-color: #fff;
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
  color: #333;
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
  background: #fff;
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
  box-shadow: inset 0 0 0 3px #f4f4f4;
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

.submit-btn {
  font-weight: bold;
  font-size: .9rem;
  height: 34px;
  margin-top: 40px;
  display: block;
  width: 100%;
  background-color: #47b6fd;
  color: #fff;
  border: none;
  border-radius: 30px;
}
</style>
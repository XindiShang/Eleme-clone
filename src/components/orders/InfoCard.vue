<template>
<div class="info-card">
  <expand-cell class="mb-1" title="备注" action="请填写口味偏好" action-color="grey" />
  <expand-cell class="mb-1" title="餐具份数" action="需要餐具" action-color="black" />
  <expand-cell title="发票" action="该店不支持线上开票，请电话联系商户" action-color="grey" :is-expandable="false"/>

</div>
  
</template>

<script>
import ExpandCell from "./ExpandCell.vue";

export default {
  components: {
    ExpandCell,
  },

}
</script>

<style scoped>
.info-card {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 16px 12px;
  border: 0.133333vw solid rgba(0, 0, 0, 0.08);
}

.mb-1 {
  margin-bottom: 4px;
}

</style>
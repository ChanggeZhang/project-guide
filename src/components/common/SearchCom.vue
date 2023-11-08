<template>
  <div class="search-form">
    <div class="search-form-item" v-for="(field) in fields" v-bind:key="field.id">
      <div class="form-label">{{field.name}}：</div>
      <field-com :field="field" />
    </div>
    <div class="search-form-item btn-group">
      <div class="btn btn-middle btn-primary">确定</div>
      <div class="btn btn-middle btn-default">取消</div>
    </div>
  </div>
</template>

<script>
import FieldCom from "@/components/common/FieldCom.vue";

export default {
  name: "SearchCom",
  components: {FieldCom},
  props: {
    fields: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
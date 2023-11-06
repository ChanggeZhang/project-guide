<template>
  <div class="edit-table">
    <div class="btn-group btn-text" v-if="!readonly">
      <div class="btn" v-if="!canEdit" @click="editable">添加数据</div>
      <div class="btn" v-if="canEdit" @click="pickHtml">提交</div>
    </div>
    <div class="table" v-if="!canEdit">
      <div class="table-body-row" v-for="(val,key) in tableValue" v-bind:key="val">
        <div class="th-head-cell">{{key}}</div>
        <div class="th-body-cell">{{val}}</div>
      </div>
    </div>
    <div class="json" v-if="canEdit" :contenteditable="canEdit" ref="editJson" v-html="jsonValue">
    </div>
  </div>
</template>

<script>
export default {
  name: "TableEditable",
  props:{
    value: {
      type: Object,
      default: () => {}
    },
    readonly: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Number,
      default: () => 2
    }
  },
  data(){
    return {
      canEdit: false,
      jsonValue: "",
      tableValue: {}
    }
  },
  created() {
    this.tableValue = this.value
  },
  watch: {
    readonly(newV){
      this.canEdit = !newV
    },
    value(newV) {
      this.tableValue = newV
    }
  },
  methods: {
    editable(){
      this.canEdit = true
      let json = this.tableValue
      let res = "";
      for (const key in json) {
        res += key + ": " + json[key] + "<br>"
      }
      this.jsonValue = res
    },
    pickHtml(){
      this.canEdit = false;
      this.jsonValue = this.$refs['editJson'].innerHTML
      let json = this.jsonValue.split("<br>")
      let res = {};
      for (const index in json) {
        let kv = json[index].split(":")
        res[kv[0].trim()] = kv.length == 1 ? "" : kv[1].trim()
      }
      this.tableValue = res
    }
  }
}
</script>

<style scoped>

</style>
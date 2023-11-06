<template>
  <div class="table">
    <div class="table-row table-header-row">
      <div class="table-cell checkbox-all">
        <label for="select-all">全选</label>
        <input type="checkbox" class="checkbox" />
      </div>
      <div class="table-cell" v-for="(cell,key) in info.columns" v-bind:key="key">{{cell}}</div>
    </div>
    <div class="table-row table-body-row" v-for="(row,ke) in info.data" v-bind:key="ke">
      <div class="table-cell">
        <input type="checkbox" class="checkbox" />
      </div>
      <div class="table-cell" v-for="(cell,k) in row" v-bind:key="k">
        <p class="cell-content" v-if="typeof cell === 'string'">{{cell}}</p>
        <div class="btn-group btn-text" v-if="cell instanceof Array">
          <div v-for="(btn) in cell" v-bind:key="btn.type" :class="btn.cls" v-text="btn.label" @click="clickEvent(btn)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListTable",
  props: {
    info: {
      type: Object,
      default: () => {
      }
    }
  },
  methods: {
    clickEvent(btn){
      this.$emit('click',btn)
    }
  }
}
</script>
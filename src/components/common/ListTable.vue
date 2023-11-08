<template>
  <div class="table-container">
    <table class="table">
      <thead>
      <tr class="table-row table-header-row">
        <th class="table-cell checkbox-all">
          <label for="select-all">全选</label>
          <input type="checkbox" class="checkbox" />
        </th>
        <th class="table-cell" v-for="(cell,key) in info.columns" v-bind:key="key">{{cell}}</th>
      </tr>
      </thead>
      <tbody>
      <tr class="table-row table-body-row" v-for="(row,ke) in info.data" v-bind:key="ke">
        <td class="table-cell">
          <input type="checkbox" class="checkbox" />
        </td>
        <td class="table-cell" v-for="(cell,k) in row" v-bind:key="k">
          <div class="cell-content" v-if="typeof cell === 'string'" v-html="cell"></div>
          <div class="btn-group" v-if="cell instanceof Array">
            <div v-for="(btn) in cell" v-bind:key="btn.type" :class="['btn','btn-text',...btn.cls]" @click="clickEvent(btn)">
              <font-awesome-icon :title="btn.label" :icon="['fa',`fa-${btn.icon}`]" v-if="btn.type == 'icon'"></font-awesome-icon>
              <span v-else>{{btn.label}}</span>
            </div>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "ListTable",
  components: {FontAwesomeIcon},
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
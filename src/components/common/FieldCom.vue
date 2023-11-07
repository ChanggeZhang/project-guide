<template>
  <!--      文本框-->
  <input type="text" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="!field.type || field.type === 'text'" />
  <!--      图片-->
  <div class="image-group" v-if="field.type === 'image'">
    <img :class="['form-input',`${field.image.type}`]" v-for="(img) in field.image.val" v-bind:key="img" :src="img"/>
  </div>
  <!--      文本域-->
  <div class="textarea form-input" :contenteditable="readonly || field.readonly" v-html="field.value" v-if="field.type === 'textarea'"></div>
  <!--      下拉框-->
  <select class="select form-input" :disabled="readonly || field.readonly" v-if="field.type === 'select'" :multiple="field.multiple">
    <option>请选择</option>
    <option v-for="(op) in field.options" v-bind:key="op.label" :selected="op.selected">{{op.label}}</option>
  </select>
  <!--      联动下拉框-->
  <div class="select-union form-input" v-if="field.type === 'select-union'">
    <select class="select form-input" :disabled="readonly || field.readonly" :multiple="field.multiple" v-for="(item,index) in field.options" v-bind:key="index">
      <option v-for="(op) in item" v-bind:key="op.label" :selected="op.selected">{{op.label}}</option>
    </select>
  </div>
  <!--      地址选择框-->
  <div class="form-input" v-if="field.type === 'area-select'">
    <div class="select-union">
      <select class="select form-input" :disabled="readonly || field.readonly" :multiple="field.multiple"
               v-for="(item,index) in field.options" v-bind:key="index">
        <option v-for="(op) in item" v-bind:key="op.label" :selected="op.selected">{{ op.label }}</option>
      </select>
    </div>
    <textarea class="area-improve form-input" :value="field.improve"></textarea>
  </div>
  <!--      单选框-->
  <div class="radio-group form-input" v-if="field.type === 'radio'">
    <div class="option"  v-for="(op) in field.options"  v-bind:key="op.label">
      <input type="radio" :name="field.id" :disabled="readonly || field.readonly" :id="`${field.id}_${op.label}`" class="radio" :checked="op.selected"  />
      <label :for="`${field.id}_${op.label}`">{{op.label}}</label>
    </div>
  </div>
  <!--      复选框-->
  <div class="radio-group form-input" v-if="field.type === 'checkbox'">
    <div class="option"  v-for="(op) in field.options"  v-bind:key="op.label">
      <input type="checkbox" :name="field.id" :disabled="readonly || field.readonly" :id="`${field.id}_${op.label}`" class="radio" :checked="op.selected"  />
      <label :for="`${field.id}_${op.label}`">{{op.label}}</label>
    </div>
  </div>
  <!--      复选框-->
  <div class="switch form-input" v-if="field.type === 'switch'">
      <input type="checkbox" :name="field.id" :disabled="readonly || field.readonly" :id="`${field.id}`" class="switch-input" :checked="selected === 'on'" @change="switchLabel"  />
    <label :for="`${field.id}`" :class="['switch-button']"><span>{{field.options[selected]}}</span></label>
  </div>
  <!--      密码-->
  <input type="password" class="form-input"  :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'password'" />
<!--  日期-->
  <input type="date" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'date'" />
  <!--  日期时间-->
  <input type="datetime-local" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'datetime'" />
  <!--  时间-->
  <input type="time" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'time'" />
  <!--  颜色拾取-->
  <input type="color" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'color'" />
  <!--  颜色拾取-->
  <input type="email" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'email'" />
  <!--  颜色拾取-->
  <input type="month" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'month'" />
  <!--  颜色拾取-->
  <input type="number" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'number'" />
  <!--  颜色拾取-->
  <input type="tel" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'tel'" />
  <!--  颜色拾取-->
  <input type="url" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'url'" />
  <!--  颜色拾取-->
  <input type="week" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'week'" />
<!--  区间范围-->
  <input type="range" :min="field.min" :max="field.max" class="form-input" :readonly="readonly || field.readonly" :value="field.value" v-if="field.type === 'range'" />
<!--  富文本-->
  <full-text :readonly="readonly || field.readonly" :value="field.value" :class="[]" v-if="field.type === 'fulltext'" />
<!--  表格-->
  <table-editable :class="[]" :value="field.value" :readonly="readonly || field.readonly" v-if="field.type === 'table'" />
  <div class="form-input file" v-if="field.type === 'file'">
    <div class="file-item" v-for="(file) in field.value" v-bind:key="file">
      <a class="file-list link" href="#">{{file}}</a>
      <div class="btn btn-text tip-error" v-if="!readonly && !field.readonly">×</div>
    </div>
    <div class="btn btn-middle">
      <div class="btn-auto btn-upload btn-primary" v-if="!readonly && !field.readonly">上传</div>
    </div>
  </div>
  <div class="form-input start-container" v-if="field.type === 'star'">
    <font-awesome-icon :icon="[`${field.value <= item ? 'far' : 'fas'}`,'star']" v-for="(item) in 5" v-bind:key="item">
    </font-awesome-icon>
  </div>
</template>

<script>
import FullText from "@/components/common/FullText.vue";
import TableEditable from "@/components/common/TableEditable.vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: "FieldCom",
  components: {FontAwesomeIcon, TableEditable, FullText},
  props: {
    field: {
      type: Object,
      default: () => {}
    },
    readonly:{
      type: Boolean,
      default: () => false
    }
  },
  created() {
    if(this.field.type === 'switch'){
      this.switchOption = this.field.options
      this.selected = this.field.value
    }
  },
  data(){
    return {
      switchOption: {},
      selected: "on"
    }
  },
  methods:{
    switchLabel(e){
      let value = e.target.checked
      this.selected = value ? 'on' : 'off'
    }
  }
}
</script>

<style scoped>

</style>
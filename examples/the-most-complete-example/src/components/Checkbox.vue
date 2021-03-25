<template>
  <div>
    <label :for="cId">
      <slot name="default"></slot>
    </label>
    <input
      :checked="value"
      :name="name"
      :id="cId"
      @change="$emit('input', $event.target.checked)"
      type="checkbox"
    />
    <div style="clear: both"></div>
  </div>
</template>

<script>
import { v1 } from "uuid";

export default {
  props: {
    name: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false,
    },
    value: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      innerId: null,
    };
  },
  computed: {
    cId() {
      return this.id || this.innerId;
    },
  },
  created() {
    this.innerId = v1();
  },
};
</script>

<style lang="scss" scoped>
label,
input {
  cursor: pointer;
  user-select: none;
}

input {
  float: left;
}

div {
  text-align: left;
}
</style>
<template>
  <input
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    @input="$emit('text-input', $event.target.value)"
    class="text-input"
    type="input"
    placeholder="Search for a photo"
    aria-label="Search for a photo "
  />
</template>

<script>
export default {
  name: 'TextInput',
  model: {
    prop: 'value',
    event: 'text-input'
  },
  props: {
    value: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.text-input {
  padding: 10px;
  border: 1px solid #b3b3b3;
  border-radius: 10px;
  font-size: 18px;
  -webkit-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 10px -5px rgba(0, 0, 0, 1);
}
</style>

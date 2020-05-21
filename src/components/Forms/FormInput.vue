<template>
  <input
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    placeholder="Parent's Name"
    class="input-primary half-input"
    type="text">
</template>

<script>
export default {
  name: 'FormInput',
};
</script>

<style scoped>

</style>

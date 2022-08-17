<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: "TextInput",
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  methods: {
    handleInput($event) {
      const value = $event.target.value;
      this.$emit("update:modelValue", value);
    },
  },
};
</script>

<style></style>

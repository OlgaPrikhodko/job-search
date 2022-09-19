<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    class="w-full text-lg font-normal focus:outline-none"
    @input="handleInput"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
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
    handleInput($event: Event) {
      const target = $event.target as HTMLInputElement;
      const value = target.value;
      this.$emit("update:modelValue", value);
    },
  },
});
</script>

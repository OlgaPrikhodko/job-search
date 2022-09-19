<template>
  <div class="w-fullborder-b border-solid border-brand-gray-1">
    <div class="mx-auto my-16 text-center">
      <slot name="title">Sample title</slot>

      <slot name="subtitle">Custom subtitle</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HeaderContainer",
});
</script>

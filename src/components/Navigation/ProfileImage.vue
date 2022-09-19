<template>
  <img :src="imageLink" class="w-8 h-8 object-contain rounded-3xl" alt="" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://ps.w.org/metronet-profile-picture/assets/icon-128x128.png?rev=2464419",
    };
  },
});
</script>

<style></style>

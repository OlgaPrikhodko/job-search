<template>
  <div>
    <main-nav />
    <!-- <router-link to="/">Home</router-link>
    <router-link to="/jobs/results">Job Results</router-link> -->

    <router-view />
  </div>
</template>

<script>
import MainNav from "@/components/Navigation/MainNav.vue";

export default {
  name: "App",
  components: { MainNav },
};
</script>

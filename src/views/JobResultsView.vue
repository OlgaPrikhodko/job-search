<template>
  <div class="flex flex-row flex-nowrap w-full">
    <job-filters-sidebar />
    <job-listing />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import JobFiltersSidebar from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue";
import JobListing from "@/components/JobResults/JobListings.vue";

export default defineComponent({
  name: "JobResults",
  components: { JobFiltersSidebar, JobListing },
});
</script>

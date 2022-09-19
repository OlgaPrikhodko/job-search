<template>
  <job-filters-sidebar-checkbox-group
    header="Job Types"
    :unique-values="uniqueJobTypes"
    :mutation="ADD_SELECTED_JOB_TYPES"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ADD_SELECTED_JOB_TYPES } from "@/store/constants";

import { useUniqueJobTypes } from "@/store/composables";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

export default defineComponent({
  name: "JobFiltersSidebarJobTypes",
  components: { JobFiltersSidebarCheckboxGroup },
  setup() {
    const uniqueJobTypes = useUniqueJobTypes();
    return { uniqueJobTypes, ADD_SELECTED_JOB_TYPES };
  },
});
</script>

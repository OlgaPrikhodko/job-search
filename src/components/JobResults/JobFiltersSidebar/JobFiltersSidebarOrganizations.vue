<template>
  <job-filters-sidebar-checkbox-group
    header="Organizations"
    :unique-values="uniqueOrganizations"
    :mutation="ADD_SELECTED_ORGANIZATIONS"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ADD_SELECTED_ORGANIZATIONS } from "@/store/constants";

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

import { useUniqueOrganizations } from "@/store/composables";

export default defineComponent({
  name: "JobFiltersSidebarOrganizations",
  components: { JobFiltersSidebarCheckboxGroup },
  setup() {
    const uniqueOrganizations = useUniqueOrganizations();
    return { uniqueOrganizations, ADD_SELECTED_ORGANIZATIONS };
  },
});
</script>

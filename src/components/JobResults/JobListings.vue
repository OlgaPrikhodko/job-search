<template>
  <main class="flex-auto p-8 bg-brand-gray-2">
    <ol>
      <job-listing
        v-for="job in displayedJobs"
        :key="job.id"
        :job="job"
        data-test="job-listing"
      />
    </ol>

    <div class="mt-8 mx-auto">
      <div class="flex flex-row flex-nowrap">
        <p class="text-sm flex-grow">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previosPage"
            :to="{ name: 'JobResults', query: { page: previosPage } }"
            class="mx-3 test-sm font-semibold text-brand-blue-1"
            data-test="previous-page-link"
            >Previous</router-link
          >
          <router-link
            v-if="nextPage"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 test-sm font-semibold text-brand-blue-1"
            data-test="next-page-link"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import JobListing from "@/components/JobResults/JobListing.vue";
import { FETCH_JOBS, FILTERED_JOBS } from "@/store/constants.js";

export default {
  name: "JobListings",
  components: { JobListing },
  computed: {
    ...mapGetters([FILTERED_JOBS]),
    currentPage() {
      const pageString = this.$route.query.page || "1";
      return parseInt(pageString);
    },
    previosPage() {
      const previosPage = this.currentPage - 1;
      const firstPage = 1;
      return previosPage >= firstPage ? previosPage : null;
    },
    nextPage() {
      const lastPage = Math.ceil(this.FILTERED_JOBS.length / 10);
      const nextPage = this.currentPage + 1;
      return nextPage <= lastPage ? nextPage : null;
    },
    displayedJobs() {
      const pageNumber = this.currentPage;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex = pageNumber * 10;
      return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
    },
  },
  async mounted() {
    this.FETCH_JOBS();
  },
  methods: {
    ...mapActions([FETCH_JOBS]),
  },
};
</script>

<style></style>

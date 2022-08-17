import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
} from "@/store/constants";

const getters = {
  [UNIQUE_ORGANIZATIONS](state) {
    const uniqueOrganizations = new Set(
      state.jobs.map(job => job.organization)
    );

    return uniqueOrganizations;
  },

  [UNIQUE_JOB_TYPES](state) {
    // Another way get unique list:
    let uniqueJobTypes = new Set();
    state.jobs.forEach(job => uniqueJobTypes.add(job.jobType));

    return uniqueJobTypes;
  },

  [INCLUDE_JOB_BY_ORGANIZATION]: state => job => {
    if (state.selectedOrganizations.length === 0) return true;

    return state.selectedOrganizations.includes(job.organization);
  },

  [INCLUDE_JOB_BY_JOB_TYPE]: state => job => {
    if (state.selectedJobTypes.length === 0) return true;

    return state.selectedJobTypes.includes(job.jobType);
  },

  [FILTERED_JOBS](state, getters) {
    return state.jobs
      .filter(job => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter(job => getters.INCLUDE_JOB_BY_JOB_TYPE(job));
  },
};

export default getters;

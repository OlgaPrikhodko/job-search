import {
  UNIQUE_ORGANIZATIONS,
  FILTERED_JOBS,
  UNIQUE_JOB_TYPES,
  INCLUDE_JOB_BY_SKILL,
  INCLUDE_JOB_BY_ORGANIZATION,
  INCLUDE_JOB_BY_JOB_TYPE,
  INCLUDE_JOB_BY_DEGREE,
  UNIQUE_DEGREES,
} from "@/store/constants";

import { GlobalState } from "@/store/types";
import { Job } from "@/api/types";

interface IncludeJobGetters {
  INCLUDE_JOB_BY_ORGANIZATION: (job: Job) => boolean;
  INCLUDE_JOB_BY_JOB_TYPE: (job: Job) => boolean;
  INCLUDE_JOB_BY_DEGREE: (job: Job) => boolean;
  INCLUDE_JOB_BY_SKILL: (kob: Job) => boolean;
}

const getters = {
  [UNIQUE_ORGANIZATIONS](state: GlobalState) {
    const uniqueOrganizations = new Set<string>(
      state.jobs.map(job => job.organization)
    );

    return uniqueOrganizations;
  },

  [UNIQUE_DEGREES](state: GlobalState) {
    return state.degrees.map(degree => degree.degree);
  },

  [UNIQUE_JOB_TYPES](state: GlobalState) {
    // Another way get unique list:
    const uniqueJobTypes = new Set<string>();
    state.jobs.forEach(job => uniqueJobTypes.add(job.jobType));

    return uniqueJobTypes;
  },

  [INCLUDE_JOB_BY_ORGANIZATION]: (state: GlobalState) => (job: Job) => {
    if (state.selectedOrganizations.length === 0) return true;

    return state.selectedOrganizations.includes(job.organization);
  },

  [INCLUDE_JOB_BY_JOB_TYPE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedJobTypes.length === 0) return true;

    return state.selectedJobTypes.includes(job.jobType);
  },

  [INCLUDE_JOB_BY_DEGREE]: (state: GlobalState) => (job: Job) => {
    if (state.selectedDegrees.length === 0) return true;

    return state.selectedDegrees.includes(job.degree);
  },

  [INCLUDE_JOB_BY_SKILL]: (state: GlobalState) => (job: Job) => {
    return job.title
      .toLocaleLowerCase()
      .includes(state.skillsSearchTerm.toLocaleLowerCase());
  },

  [FILTERED_JOBS](state: GlobalState, getters: IncludeJobGetters) {
    return state.jobs
      .filter(job => getters.INCLUDE_JOB_BY_ORGANIZATION(job))
      .filter(job => getters.INCLUDE_JOB_BY_JOB_TYPE(job))
      .filter(job => getters.INCLUDE_JOB_BY_DEGREE(job))
      .filter(job => getters.INCLUDE_JOB_BY_SKILL(job));
  },
};

export default getters;

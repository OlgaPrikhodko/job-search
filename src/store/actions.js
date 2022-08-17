import { FETCH_JOBS, RECEIVE_JOBS } from "@/store/constants";

import getJobs from "@/api/getJobs";

const actions = {
  [FETCH_JOBS]: async context => {
    const jobListing = await getJobs();
    context.commit(RECEIVE_JOBS, jobListing);
  },
};

export default actions;

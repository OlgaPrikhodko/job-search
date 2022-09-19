import { Commit } from "vuex";

import {
  FETCH_JOBS,
  FETCH_DEGREES,
  RECEIVE_JOBS,
  RECEIVE_DEGREES,
} from "@/store/constants";

import getJobs from "@/api/getJobs";
import getDegrees from "@/api/getDegrees";

interface Context {
  commit: Commit;
}

const actions = {
  [FETCH_JOBS]: async (context: Context) => {
    const jobListing = await getJobs();
    context.commit(RECEIVE_JOBS, jobListing);
  },

  [FETCH_DEGREES]: async (context: Context) => {
    const degreeListing = await getDegrees();
    context.commit(RECEIVE_DEGREES, degreeListing);
  },
};

export default actions;

import { useStore } from "vuex";
jest.mock("vuex");

import {
  useFilteredJobs,
  useUniqueJobTypes,
  useUniqueOrganizations,
  useFetchJobsDispatch,
  useUniqueDegrees,
  useFetchDegreesDispatch,
} from "@/store/composables";

const useStoreMock = useStore as jest.Mock;

describe("composables", () => {
  describe("useFilteredJobs", () => {
    it("retrieves filtered jobs from store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          FILTERED_JOBS: [{ id: 1 }],
        },
      });

      const result = useFilteredJobs();
      expect(result.value).toEqual([{ id: 1 }]);
    });
  });

  describe("useUniqueJobTypes", () => {
    it("retrieves unique job types from the store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Full-time"]),
        },
      });

      const result = useUniqueJobTypes();
      expect(result.value).toEqual(new Set(["Full-time"]));
    });
  });

  describe("uniqueOrganizations", () => {
    it("retrieves unique job organizations from the store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_ORGANIZATIONS: new Set(["Apple"]),
        },
      });

      const result = useUniqueOrganizations();
      expect(result.value).toEqual(new Set(["Apple"]));
    });
  });

  describe("useUniqueDegrees", () => {
    it("retrieve unique degrees from the store", () => {
      useStoreMock.mockReturnValue({
        getters: {
          UNIQUE_DEGREES: ["Bachelor's"],
        },
      });

      const result = useUniqueDegrees();
      expect(result.value).toEqual(["Bachelor's"]);
    });
  });

  describe("useFetchJobsDispatch", () => {
    it("sends call to fetch jobs from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({ dispatch });
      useFetchJobsDispatch();
      expect(dispatch).toHaveBeenCalledWith("FETCH_JOBS");
    });
  });

  describe("useFetchDegreeDispatch", () => {
    it("sends call to fetch degrees from API", () => {
      const dispatch = jest.fn();
      useStoreMock.mockReturnValue({ dispatch });
      useFetchDegreesDispatch();
      expect(dispatch).toHaveBeenCalledWith("FETCH_DEGREES");
    });
  });
});

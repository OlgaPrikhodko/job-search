import getters from "@/store/getters";

import { createState, createJob, createDegree } from "./utils";

describe("getters", () => {
  describe("UNIQUE_ORGANIZATIONS", () => {
    it("finds unique organizations from list of jobs", () => {
      const jobs = [
        createJob({ organization: "VueTube" }),
        createJob({ organization: "Google" }),
        createJob({ organization: "VueTube" }),
      ];
      const initialState = createState({ jobs });
      const result = getters.UNIQUE_ORGANIZATIONS(initialState);
      expect(result).toEqual(new Set(["VueTube", "Google"]));
    });
  });

  describe("UNIQUE_JOB_TYPES", () => {
    it("finds unique job types from list of jobs", () => {
      const jobs = [
        createJob({ jobType: "Full-time" }),
        createJob({ jobType: "Intern" }),
        createJob({ jobType: "Full-time" }),
      ];
      const state = createState({ jobs });
      const result = getters.UNIQUE_JOB_TYPES(state);
      expect(result).toEqual(new Set(["Full-time", "Intern"]));
    });
  });

  describe("UNIQUE_DEGREES", () => {
    it("extracts unique degree values", () => {
      const degrees = [
        createDegree({ degree: "Master's" }),
        createDegree({ degree: "Bachelor's" }),
      ];
      const state = createState({ degrees });
      const result = getters.UNIQUE_DEGREES(state);
      expect(result).toEqual(["Master's", "Bachelor's"]);
    });
  });

  describe("INCLUDE_JOB_BY_ORGANIZATION", () => {
    describe("when the user has not selected any organizations", () => {
      it("includes jobs", () => {
        const state = createState({
          selectedOrganizations: [],
        });
        const job = createJob({ organization: "Google" });
        const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
        expect(includeJob).toBe(true);
      });
    });

    it("identifiers if jobis associated with given organization", () => {
      const state = createState({
        selectedOrganizations: ["Google", "Amazon"],
      });
      const job = createJob({ organization: "Google" });
      const includeJob = getters.INCLUDE_JOB_BY_ORGANIZATION(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_JOB_TYPE", () => {
    describe("when the user has not selected any job types", () => {
      it("includes jobs", () => {
        const state = createState({
          selectedJobTypes: [],
        });
        const job = createJob({ jobType: "Full-time" });
        const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
        expect(includeJob).toBe(true);
      });
    });

    it("identifiers if jobis associated with given job type", () => {
      const state = createState({
        selectedJobTypes: ["Full-time", "Part-time"],
      });
      const job = createJob({ jobType: "Full-time" });

      const includeJob = getters.INCLUDE_JOB_BY_JOB_TYPE(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("INCLUDE_JOB_BY_SKILL", () => {
    it("identify if job matches user's skill", () => {
      const state = createState({ skillsSearchTerm: "Vue" });
      const job = createJob({ title: "Vue Developer" });
      const includeJob = getters.INCLUDE_JOB_BY_SKILL(state)(job);
      expect(includeJob).toBe(true);
    });

    it("handles inconsistent character casing", () => {
      const state = createState({ skillsSearchTerm: "vuE" });
      const job = createJob({ title: "Vue Developer" });
      const includeJob = getters.INCLUDE_JOB_BY_SKILL(state)(job);
      expect(includeJob).toBe(true);
    });

    describe("when the user doesn't entered any skill", () => {
      it("included job", () => {
        const state = createState({ skillsSearchTerm: "" });
        const job = createJob({ title: "Vue Developer" });
        const includeJob = getters.INCLUDE_JOB_BY_SKILL(state)(job);
        expect(includeJob).toBe(true);
      });
    });
  });

  describe("INCLUDE_JOB_BY_DEGREE", () => {
    describe("when the user has not selected any degree", () => {
      it("includes jobs", () => {
        const state = createState({
          selectedDegrees: [],
        });
        const job = createJob({ degree: "Master's" });
        const includeJob = getters.INCLUDE_JOB_BY_DEGREE(state)(job);
        expect(includeJob).toBe(true);
      });
    });

    it("identifiers if jobis associated with given job type", () => {
      const state = createState({
        selectedDegrees: ["Master's", "Bachelo's"],
      });
      const job = createJob({ degree: "Master's" });

      const includeJob = getters.INCLUDE_JOB_BY_DEGREE(state)(job);
      expect(includeJob).toBe(true);
    });
  });

  describe("FILTERED_JOBS", () => {
    it("filtered jobs by organization, job type and degree", () => {
      const INCLUDE_JOB_BY_ORGANIZATION = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_JOB_TYPE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_DEGREE = jest.fn().mockReturnValue(true);
      const INCLUDE_JOB_BY_SKILL = jest.fn().mockReturnValue(true);

      const mockGetters = {
        INCLUDE_JOB_BY_ORGANIZATION,
        INCLUDE_JOB_BY_JOB_TYPE,
        INCLUDE_JOB_BY_DEGREE,
        INCLUDE_JOB_BY_SKILL,
      };

      const job = createJob({ id: 1, title: "The Best Job Ever" });
      const state = createState({
        jobs: [job],
      });

      const result = getters.FILTERED_JOBS(state, mockGetters);

      expect(result).toEqual([job]);
      expect(INCLUDE_JOB_BY_ORGANIZATION).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_JOB_TYPE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_DEGREE).toHaveBeenCalledWith(job);
      expect(INCLUDE_JOB_BY_SKILL).toHaveBeenCalledWith(job);
    });
  });
});

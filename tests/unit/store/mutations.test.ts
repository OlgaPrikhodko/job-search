import mutations from "@/store/mutations";
import {
  createState,
  createJob,
  createDegree,
} from "@/../tests/unit/store/utils";

describe("mutations", () => {
  describe("LOGIN_USER", () => {
    it("logs the user in", () => {
      const startingState = createState({ isLoggedIn: false });
      mutations.LOGIN_USER(startingState);
      expect(startingState.isLoggedIn).toEqual(true);
    });
  });

  describe("RECEIVE_JOBS", () => {
    it("receive jobs from API response", () => {
      const startingState = createState({ jobs: [] });
      const jobOne = createJob();
      const jobTwo = createJob();
      mutations.RECEIVE_JOBS(startingState, [jobOne, jobTwo]);
      expect(startingState.jobs).toEqual([jobOne, jobTwo]);
    });
  });

  describe("RECEIVE_DEGREES", () => {
    it("receive degrees from API response", () => {
      const startingState = createState({ degrees: [] });
      const degree = createDegree();
      mutations.RECEIVE_DEGREES(startingState, [degree]);
      expect(startingState.degrees).toEqual([degree]);
    });
  });

  describe("ADD_SELECTED_ORGANIZATIONS", () => {
    it("updates organizations that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedOrganizations: [] });
      mutations.ADD_SELECTED_ORGANIZATIONS(startingState, ["Org1", "Org2"]);
      expect(startingState.selectedOrganizations).toEqual(["Org1", "Org2"]);
    });
  });

  describe("ADD_SELECTED_JOB_TYPES", () => {
    it("updates job types that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedJobTypes: [] });
      mutations.ADD_SELECTED_JOB_TYPES(startingState, [
        "Full-time",
        "Part-time",
      ]);
      expect(startingState.selectedJobTypes).toEqual([
        "Full-time",
        "Part-time",
      ]);
    });
  });

  describe("ADD_SELECTED_DEGREES", () => {
    it("updates degrees that the user has chosen to filter jobs by", () => {
      const startingState = createState({ selectedDegrees: [] });
      mutations.ADD_SELECTED_DEGREES(startingState, ["Master's", "Bachelor's"]);
      expect(startingState.selectedDegrees).toEqual(["Master's", "Bachelor's"]);
    });
  });

  describe("UPDATE_SKILLS_SEARCH_TERM", () => {
    it("receives serch term for skills the user has", () => {
      const startingState = createState({ skillsSearchTerm: "" });
      mutations.UPDATE_SKILLS_SEARCH_TERM(startingState, "Vue developer");
      expect(startingState.skillsSearchTerm).toBe("Vue developer");
    });
  });

  describe("CLEAR_USER_JOB_FILTER_SELECTIONS", () => {
    it("removes all job filters that user has chosen", () => {
      const startingState = createState({
        selectedJobTypes: ["Full-time"],
        selectedOrganizations: ["Apple"],
        selectedDegrees: ["Associate"],
        skillsSearchTerm: "JavaScript",
      });
      mutations.CLEAR_USER_JOB_FILTER_SELECTIONS(startingState);
      expect(startingState.selectedOrganizations).toEqual([]);
      expect(startingState.selectedJobTypes).toEqual([]);
      expect(startingState.selectedDegrees).toEqual([]);
      expect(startingState.skillsSearchTerm).toEqual("");
    });
  });
});

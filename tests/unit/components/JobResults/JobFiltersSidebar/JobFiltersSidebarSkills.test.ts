import { shallowMount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");
const useStoreMock = useStore as jest.Mock;

import JobFiltersSidebarSkills from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue";

describe("JobFiltersSidebarSkills", () => {
  it("populates seach input from store", () => {
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "Developer",
      },
      commit: jest.fn(),
    });
    const wrapper = shallowMount(JobFiltersSidebarSkills);
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input'");
    const inputElement = skillsSearchInput.element as HTMLInputElement;
    expect(inputElement.value).toBe("Developer");
  });

  it("tells store that the user has entered skills search term", async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "",
      },
      commit,
    });
    const wrapper = shallowMount(JobFiltersSidebarSkills);
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input'");
    await skillsSearchInput.setValue("developer");
    expect(commit).toHaveBeenCalledWith(
      "UPDATE_SKILLS_SEARCH_TERM",
      "developer"
    );
  });

  it("removes whitespace from user input", async () => {
    const commit = jest.fn();
    useStoreMock.mockReturnValue({
      state: {
        skillsSearchTerm: "",
      },
      commit,
    });
    const wrapper = shallowMount(JobFiltersSidebarSkills);
    const skillsSearchInput = wrapper.find("[data-test='skills-search-input'");
    await skillsSearchInput.setValue(" developer ");
    expect(commit).toHaveBeenCalledWith(
      "UPDATE_SKILLS_SEARCH_TERM",
      "developer"
    );
  });
});

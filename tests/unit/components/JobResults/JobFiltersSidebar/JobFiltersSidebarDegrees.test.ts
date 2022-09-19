import { shallowMount } from "@vue/test-utils";

import JobFiltersSidebarDegrees from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue";

import { useUniqueDegrees } from "@/store/composables";
jest.mock("@/store/composables");

const useUniqueDegreesMock = useUniqueDegrees as jest.Mock;

describe("JobFiltersSidebarDegrees", () => {
  it("allows user to filter jobs by degrees", () => {
    useUniqueDegreesMock.mockReturnValue(["Master's"]);
    const wrapper = shallowMount(JobFiltersSidebarDegrees);

    const degreesFilter = wrapper.findComponent({
      name: "JobFiltersSidebarCheckboxGroup",
    });
    const { uniqueValues, mutation } = degreesFilter.props();
    expect(uniqueValues).toEqual(["Master's"]);
    expect(mutation).toBe("ADD_SELECTED_DEGREES");
  });
});

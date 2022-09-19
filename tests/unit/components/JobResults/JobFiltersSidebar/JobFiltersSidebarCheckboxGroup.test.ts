import { shallowMount } from "@vue/test-utils";

import { useStore } from "vuex";
jest.mock("vuex");

import { useRouter } from "vue-router";
jest.mock("vue-router");

import JobFiltersSidebarCheckboxGroup from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue";

const useStoreMock = useStore as jest.Mock;
const useRouterMock = useRouter as jest.Mock;

describe("JobFiltersSidebarCheckboxGroup", () => {
  const createConfig = (props = {}) => ({
    props: {
      uniqueValues: new Set(["ValueA", "ValueB"]),
      mutation: "Some mutation",
      ...props,
    },
  });

  it("renders unique list of values for filtering jobs", async () => {
    useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });

    const props = {
      uniqueValues: new Set(["ValueA", "ValueB"]),
    };
    const wrapper = shallowMount(
      JobFiltersSidebarCheckboxGroup,
      createConfig(props)
    );

    const inputLabels = wrapper.findAll("[data-test='value']");
    const inputValues = inputLabels.map(node => node.text());

    expect(inputValues).toEqual(["ValueA", "ValueB"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for value", async () => {
      const commit = jest.fn();
      useStoreMock.mockReturnValue({ commit, subscribe: jest.fn() });
      useRouterMock.mockReturnValue({ push: jest.fn() });
      const props = {
        uniqueValues: new Set(["Part-time"]),
        mutation: "SOME_MUTATION",
      };
      const wrapper = shallowMount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const PartTimeInput = wrapper.find("[data-test='Part-time']");
      await PartTimeInput.setValue(true);

      expect(commit).toHaveBeenCalledWith("SOME_MUTATION", ["Part-time"]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      useStoreMock.mockReturnValue({ commit: jest.fn(), subscribe: jest.fn() });

      const push = jest.fn();
      useRouterMock.mockReturnValue({ push });
      const props = {
        uniqueValues: new Set(["Part-time"]),
      };

      const wrapper = shallowMount(
        JobFiltersSidebarCheckboxGroup,
        createConfig(props)
      );

      const PartTimeInput = wrapper.find("[data-test='Part-time']");
      await PartTimeInput.setValue(true);

      expect(push).toHaveBeenLastCalledWith({ name: "JobResults" });
    });
  });
});

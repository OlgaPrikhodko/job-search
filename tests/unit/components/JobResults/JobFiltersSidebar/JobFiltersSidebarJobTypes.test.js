import { mount } from "@vue/test-utils";

import JobFiltersSidebarJobTypes from "@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
  const createConfig = ($store, $router) => ({
    global: {
      mocks: { $store, $router },
      stubs: { FontAwesomeIcon: true },
    },
  });

  it("renders unique list of job types for filtering jobs", async () => {
    const $store = {
      getters: {
        UNIQUE_JOB_TYPES: new Set(["Part-time", "Full-time"]),
      },
    };
    const $router = { push: jest.fn() };
    const wrapper = mount(
      JobFiltersSidebarJobTypes,
      createConfig($store, $router)
    );

    const clickableArea = wrapper.find("[data-test='clickable-area']");
    await clickableArea.trigger("click");

    const jobTypesLabels = wrapper.findAll("[data-test='job-type']");
    const jobTypes = jobTypesLabels.map(node => node.text());

    expect(jobTypes).toEqual(["Part-time", "Full-time"]);
  });

  describe("when user clicks checkbox", () => {
    it("communicates that user has selected checkbox for job types", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Part-time", "Full-time"]),
        },
        commit,
      };
      const $router = { push: jest.fn() };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const PartTimeInput = wrapper.find("[data-test='Part-time']");
      await PartTimeInput.setChecked();

      expect(commit).toHaveBeenCalledWith("ADD_SELECTED_JOB_TYPES", [
        "Part-time",
      ]);
    });

    it("navigates user to job results page to see fresh batch of filtered jobs", async () => {
      const commit = jest.fn();
      const $store = {
        getters: {
          UNIQUE_JOB_TYPES: new Set(["Part-time", "Full-time"]),
        },
        commit,
      };
      const push = jest.fn();
      const $router = { push };
      const wrapper = mount(
        JobFiltersSidebarJobTypes,
        createConfig($store, $router)
      );

      const clickableArea = wrapper.find("[data-test='clickable-area']");
      await clickableArea.trigger("click");

      const PartTimeInput = wrapper.find("[data-test='Part-time']");
      await PartTimeInput.setChecked();

      expect(push).toHaveBeenLastCalledWith({ name: "JobResults" });
    });
  });
});

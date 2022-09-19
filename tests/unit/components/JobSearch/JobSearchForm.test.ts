import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";
jest.mock("vue-router");

const useRouterMock = useRouter as jest.Mock;

import JobSearchForm from "@/components/JobSearch/JobSearchForm.vue";

describe("JobSeachForm", () => {
  describe("when the user submits the form", () => {
    it("directs user to job results page with users search parameters", async () => {
      const push = jest.fn();
      useRouterMock.mockReturnValue({
        push,
      });

      const config = {
        attachTo: document.body,
        global: {
          stubs: { FontAwesomeIcon: true },
        },
      };
      const wrapper = mount(JobSearchForm, config);

      const roleInput = wrapper.find("[data-test='role-input']");
      await roleInput.setValue("Vue Developer");

      const locationInput = wrapper.find("[data-test='location-input']");
      await locationInput.setValue("New York");

      const submitButton = wrapper.find("[data-test='form-submit-button']");
      await submitButton.trigger("click");

      expect(push).toHaveBeenCalledWith({
        name: "JobResults",
        query: { role: "Vue Developer", location: "New York" },
      });
    });
  });
});

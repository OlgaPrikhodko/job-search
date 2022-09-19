import { mount } from "@vue/test-utils";

import ActionButton from "@/components/Shared/ActionButton.vue";

describe("ActionButton", () => {
  it("renders test", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm so clickable",
        type: "primary",
      },
    });
    expect(wrapper.text()).toMatch("I'm so clickable");
  });

  it("applies oneof several styles to button", () => {
    const wrapper = mount(ActionButton, {
      props: {
        text: "I'm so clickable",
        type: "primary",
      },
    });
    const button = wrapper.find("button");
    expect(button.classes("primary")).toBe(true);
  });
});

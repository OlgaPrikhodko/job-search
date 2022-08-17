import { mount, flushPromises } from "@vue/test-utils";

import axios from "axios";
jest.mock("axios");

import Spotlight from "@/components/JobSearch/Spotlight.vue";

describe("Spotlight", () => {
  const mockSpotlightResponse = (data = {}) => {
    axios.get.mockResolvedValue({
      data: [
        {
          img: "Some Image",
          title: "Some Title",
          description: "Some Description",
          ...data,
        },
      ],
    });
  };
  it("provides img attribute to parent component", async () => {
    const data = { img: "Some Image" };
    mockSpotlightResponse({ data });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.img }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some Image");
  });

  it("provides title attribute to parent component", async () => {
    const data = { title: "Some Title" };
    mockSpotlightResponse({ data });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.title }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some Title");
  });

  it("provides description attribute to parent component", async () => {
    const data = { description: "Some Description" };
    mockSpotlightResponse({ data });

    const wrapper = mount(Spotlight, {
      slots: {
        default: `<template #default="slotProps">
        <h1>{{ slotProps.description }}</h1>
        </template>`,
      },
    });
    await flushPromises();
    expect(wrapper.text()).toMatch("Some Description");
  });
});

import { mount, RouterLinkStub } from "@vue/test-utils";

import JobListing from "@/components/JobResults/JobListing.vue";
import { createJob } from "../../store/utils";

import { Job } from "@/api/types";

describe("JobListing", () => {
  const createConfig = (job: Job) => ({
    props: {
      job: { ...job },
    },
    global: {
      stubs: {
        "router-link": RouterLinkStub,
      },
    },
  });

  it("renders job title", () => {
    const job = createJob({ title: "Vue Programmer" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Vue Programmer");
  });

  it("renders job organization", () => {
    const job = createJob({ organization: "AirBnb" });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("AirBnb");
  });

  it("renders job locations", () => {
    const job = createJob({ locations: ["Los Angeles", "New York"] });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Los Angeles");
    expect(wrapper.text()).toMatch("New York");
  });

  it("renders job qualifications", () => {
    const job = createJob({
      minimumQualifications: ["Code", "Develop"],
    });
    const wrapper = mount(JobListing, createConfig(job));
    expect(wrapper.text()).toMatch("Code");
    expect(wrapper.text()).toMatch("Develop");
  });

  it("links to the individual job's page", () => {
    const job = createJob({ id: 15 });
    const wrapper = mount(JobListing, createConfig(job));
    const jobPageLink = wrapper.findComponent(RouterLinkStub);
    const jobProp = jobPageLink.props("to");
    expect(jobProp).toBe("/jobs/results/15");
  });
});

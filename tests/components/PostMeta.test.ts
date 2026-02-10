import { describe, it, expect } from "vitest";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import PostMeta from "~/components/PostMeta.vue";

describe("PostMeta", () => {
  it("renders date correctly", async () => {
    const wrapper = await mountSuspended(PostMeta, {
      props: {
        date: "2024-01-15",
      },
    });

    expect(wrapper.text()).toContain("2024年1月15日");
  });

  it("renders tags when provided", async () => {
    const wrapper = await mountSuspended(PostMeta, {
      props: {
        date: "2024-01-15",
        tags: ["Nuxt", "Vue.js"],
      },
    });

    expect(wrapper.text()).toContain("#Nuxt");
    expect(wrapper.text()).toContain("#Vue.js");
  });

  it("does not render tags section when no tags provided", async () => {
    const wrapper = await mountSuspended(PostMeta, {
      props: {
        date: "2024-01-15",
      },
    });

    expect(wrapper.findAll("a").length).toBe(0);
  });
});

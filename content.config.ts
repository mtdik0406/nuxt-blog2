import { defineCollection, defineContentConfig } from "@nuxt/content";
import { z } from "zod";

const blog = defineCollection({
  type: "page",
  source: "blog/**/*.md",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    tags: z.array(z.string()).optional(),
  }),
});

export default defineContentConfig({
  collections: {
    blog,
  },
});

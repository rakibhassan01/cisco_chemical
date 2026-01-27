import { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  fields: [
    {
      name: "heroTitle",
      type: "text",
      required: true,
    },
    {
      name: "heroSubtitle",
      type: "text",
    },
    {
      name: "featuredProducts",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
    },
  ],
};

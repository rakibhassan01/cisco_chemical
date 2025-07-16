import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
  ],
};

import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "updatedAt"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "specs",
      type: "array",
      fields: [
        {
          name: "spec",
          type: "text",
        },
      ],
    },
    {
      name: "applications",
      type: "array",
      fields: [
        {
          name: "application",
          type: "text",
        },
      ],
    },
  ],
};

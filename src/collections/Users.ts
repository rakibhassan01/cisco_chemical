import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "cart",
      type: "array",
      admin: {
        description: "Items in the user's cart",
      },
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
          required: true,
        },
        {
          name: "quantity",
          type: "number",
          min: 1,
          required: true,
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "price",
          type: "number",
        },
        {
          name: "image",
          type: "text",
        },
        {
          name: "slug",
          type: "text",
        },
      ],
    },
  ],
};

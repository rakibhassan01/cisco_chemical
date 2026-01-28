import type { CollectionConfig } from "payload";
import type { User } from "../payload-types";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    read: ({ req: { user } }: { req: { user: User | null } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      return {
        id: {
          equals: user.id,
        },
      };
    },
    update: ({ req: { user } }: { req: { user: User | null } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      return {
        id: {
          equals: user.id,
        },
      };
    },
    delete: ({ req: { user } }: { req: { user: User | null } }) => {
      if (!user) return false;
      if (user.role === "admin") return true;
      return false; // Regular users cannot delete themselves or others
    },
    create: () => true, // Anyone can sign up
  },
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
      name: "role",
      type: "select",
      required: true,
      defaultValue: "user",
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" },
      ],
      access: {
        update: ({ req: { user } }: { req: { user: User | null } }) =>
          user?.role === "admin",
      },
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

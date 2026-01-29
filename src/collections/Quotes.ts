import type { CollectionConfig } from "payload";
import type { User } from "../payload-types";

export const Quotes: CollectionConfig = {
  slug: "quotes",
  admin: {
    useAsTitle: "id",
    defaultColumns: ["id", "user", "status", "quotedPrice", "createdAt"],
  },
  access: {
    read: ({ req: { user } }: { req: { user: User | null } }) => {
      if (!user) return false;
      if (user.role === "admin" || user.role === "sales_manager") return true;
      return {
        user: {
          equals: user.id,
        },
      };
    },
    create: ({ req: { user } }: { req: { user: User | null } }) => !!user,
    update: ({ req: { user } }: { req: { user: User | null } }) => {
      if (!user) return false;
      return user.role === "admin" || user.role === "sales_manager";
    },
    delete: ({ req: { user } }: { req: { user: User | null } }) => {
      if (!user) return false;
      return user.role === "admin";
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: "items",
      type: "array",
      required: true,
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
      ],
    },
    {
      name: "note",
      type: "textarea",
      label: "Customer Note",
    },
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      required: true,
      options: [
        { label: "Pending Review", value: "pending" },
        { label: "Quoted", value: "quoted" },
        { label: "Paid", value: "paid" },
        { label: "Cancelled", value: "cancelled" },
      ],
      access: {
        update: ({ req: { user } }: { req: { user: User | null } }) =>
          user?.role === "admin" || user?.role === "sales_manager",
      },
    },
    {
      name: "quotedPrice",
      type: "number",
      label: "Approved Price ($)",
      admin: {
        description: "Set by admin to approve the quote",
        position: "sidebar",
        condition: (data) => data?.status !== "pending",
      },
      access: {
        update: ({ req: { user } }: { req: { user: User | null } }) =>
          user?.role === "admin" || user?.role === "sales_manager",
      },
    },
  ],
};

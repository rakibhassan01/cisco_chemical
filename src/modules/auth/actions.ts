"use server";

import configPromise from "@payload-config";
import { getPayload } from "payload";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signUpAction(data: {
  email: string;
  password: string;
  name: string;
}) {
  const payload = await getPayload({ config: configPromise });

  try {
    // Check if user already exists
    const existingUser = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: data.email,
        },
      },
    });

    if (existingUser.docs.length > 0) {
      return { error: "User already exists with this email" };
    }

    await payload.create({
      collection: "users",
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
      },
    });

    // After sign up, log them in
    await payload.login({
      collection: "users",
      data: {
        email: data.email,
        password: data.password,
      },
      // @ts-expect-error - Payload 3.0 type issues with server actions cookies
      res: await cookies(),
    });
  } catch (err: unknown) {
    console.error("Sign up error:", err);
    return { error: (err as Error).message || "Failed to create account" };
  }

  redirect("/");
}

export async function signInAction(data: { email: string; password: string }) {
  const payload = await getPayload({ config: configPromise });

  try {
    const result = await payload.login({
      collection: "users",
      data: {
        email: data.email,
        password: data.password,
      },
      // @ts-expect-error - Payload 3.0 type issues with server actions cookies
      res: await cookies(),
    });

    if (!result.user) {
      return { error: "Invalid email or password" };
    }
  } catch {
    return { error: "Invalid email or password" };
  }

  redirect("/");
}

export async function signOutAction() {
  const payload = await getPayload({ config: configPromise });
  // @ts-expect-error - Payload 3.0 type issues with server actions
  await payload.logout({
    collection: "users",
    res: await cookies(),
  });
  redirect("/sign-in");
}

export async function getCurrentUser() {
  const payload = await getPayload({ config: configPromise });
  // @ts-expect-error - Payload 3.0 type issues with server actions cookies
  const { user } = await payload.auth({ headers: await cookies() });
  return user;
}

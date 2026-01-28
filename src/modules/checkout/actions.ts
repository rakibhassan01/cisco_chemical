"use server";

import Stripe from "stripe";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { getCurrentUser } from "@/modules/auth/actions";
import { CartItem } from "@/hooks/use-cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover", // Use required API version
});

export const createPaymentIntentAction = async (amount: number) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Stripe expects cents
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw new Error("Failed to create payment intent");
  }
};

export const createOrderAction = async (items: CartItem[], total: number) => {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const payload = await getPayload({ config: configPromise });

  try {
    const order = await payload.create({
      collection: "orders",
      data: {
        user: user.id,
        total: total,
        status: "processing",
        items: items.map(item => ({
          product: Number(item.id),
          quantity: item.quantity,
          price: item.price,
        })),
      },
    });

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error("Failed to create order");
  }
};

import app from "@firebase/firebase";
import { getFunctions, httpsCallable } from "@firebase/functions";
import {
  createCheckoutSession,
  getStripePayments,
} from "@stripe/firestore-stripe-payments";

export const payments = getStripePayments(app, {
  productsCollection: "products",
  customersCollection: "customers",
});

export const loadCheckout = async (priceId: string) => {
  try {
    const snapshot = await createCheckoutSession(payments, {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    window.location.assign(snapshot.url);
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
};

export const goToBillingPortal = async () => {
  const instance = getFunctions(app, "us-central1");

  const functionRef = httpsCallable(
    instance,
    "ext-firestore-stripe-payments-createPortalLink"
  );

  try {
    const { data } = (await functionRef({
      returnUrl: `${window.location.origin}/account`,
    })) as any;

    window.location.assign(data.url);
  } catch (error) {}
};

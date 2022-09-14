import { payments } from "@lib/stripe/stripe";
import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from "@stripe/firestore-stripe-payments";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

const useSubscription = (user: User | null) => {
  const [subscription, setSubscription] = useState<Subscription | null>();

  useEffect(() => {
    if (!user) return;

    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        snapshot.subscriptions.filter(
          (sub) => sub.status === "active" || sub.status === "trialing"
        )[0]
      );
    });
  }, [user]);

  return subscription;
};

export default useSubscription;

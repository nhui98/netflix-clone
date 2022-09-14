import { useAuth } from "@hooks/useAuth";
import { loadCheckout } from "@lib/stripe/stripe";
import { Product } from "@stripe/firestore-stripe-payments";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { PlansProps } from "src/types";

import { Spinner2 } from "../Spinner/Spinner";
import { FEATURES } from "./Plans.data";
import Table from "./Table";

const Plans: NextPage<PlansProps> = ({ products }) => {
  const { logout, user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<Product>(products[2]);
  const [isBillingLoading, setIsBillingLoading] = useState(false);

  const subscribeToPlan = () => {
    if (!user) return;

    loadCheckout(selectedPlan?.prices[0].id);

    setIsBillingLoading(true);
  };

  return (
    <div>
      <Head>
        <title>Netflix | Plans</title>
        <meta name="description" content="Netflix home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="header border-b border-white/10 bg-[#141414]">
        <Link href={"/"}>
          <img
            src="/netflix-logo.svg"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
            alt="logo"
          />
        </Link>
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that&apos;s right for you
        </h1>
        <ul>
          {FEATURES.map(({ feature, id }) => (
            <li key={id} className="flex items-center gap-x-2 text-lg">
              <AiOutlineCheck className="h-7 w-7 text-[#E50914]" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-center self-end md:w-3/5">
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox ${
                  selectedPlan?.id === product.id ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          {/* table */}
          <Table products={products} selectedPlan={selectedPlan} />

          {/* subscribe */}
          <button
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && "opacity-60"
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? <Spinner2 /> : "Subscribe"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Plans;

// src/app/checkout/page.tsx
import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout",
};

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <CheckoutClient />
    </Suspense>
  );
}

// src/app/success/page.tsx
import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const metadata = {
  title: "Success",
};

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <SuccessClient />
    </Suspense>
  );
}

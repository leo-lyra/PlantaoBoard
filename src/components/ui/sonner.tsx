"use client";

import * as React from "react";
import { Toaster as SonnerToaster } from "sonner";

export type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

/** Wrapper do Sonner com defaults seguros para o app */
export function Toaster(props: ToasterProps) {
  return (
    <SonnerToaster
      richColors
      closeButton
      position="top-right"
      {...props}
    />
  );
}

/** Também exporta default para quem importar sem chaves */
export default Toaster;

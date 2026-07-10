"use client";

import type { ReactNode } from "react";

export default function MockForm({ children }: { children: ReactNode }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}

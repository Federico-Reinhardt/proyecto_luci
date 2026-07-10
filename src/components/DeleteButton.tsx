"use client";

import { useTransition } from "react";

export default function DeleteButton({
  action,
  confirmMessage,
}: {
  action: () => Promise<{ error?: string } | void>;
  confirmMessage: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (!confirm(confirmMessage)) return;
        startTransition(async () => {
          const result = await action();
          if (result?.error) alert(result.error);
        });
      }}
      className="rounded-lg border border-red-300 bg-white px-3.5 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
    >
      {pending ? "Borrando..." : "Borrar"}
    </button>
  );
}

"use client";

import { FormPageProps } from "@/utils/types";

export default function Marketplace({ register, setViewState }: FormPageProps) {
  console.log(register);

  return (
    <>
      <div className="flex gap-6">
        <button
          onClick={() => setViewState("ProductProperties")}
          className="button-outline"
        >
          Föregående
        </button>

        <button type="submit" className="button-fill">
          Klar
        </button>
      </div>
    </>
  );
}

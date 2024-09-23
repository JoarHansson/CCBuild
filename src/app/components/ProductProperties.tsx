"use client";

import { FormPageProps } from "@/utils/types";

export default function ProductProperties({
  register,
  setViewState,
}: FormPageProps) {
  console.log(register);

  return (
    <>
      <div className="flex gap-6">
        <div>
          <button
            onClick={() => setViewState("LocationStatusAmount")}
            className="button-outline"
          >
            Föregående
          </button>
          <button
            onClick={() => setViewState("Marketplace")}
            className="button-fill"
          >
            Nästa
          </button>
        </div>
        <button type="submit" className="button-outline">
          Spara
        </button>
      </div>
    </>
  );
}

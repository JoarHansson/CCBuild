"use client";

import { FormPageProps } from "@/utils/types";
import { LabelWrapper } from "./LabelWrapper";

export default function Marketplace({ register, setViewState }: FormPageProps) {
  console.log(register);

  return (
    <>
      <h1>Hantering för marknadsplats</h1>
      <p>Alla priser ska anges exklusive moms*</p>
      <LabelWrapper labelText="Nypris / st">
        <input
          {...(register("originalPrice"), { valueAsNumber: true })}
          type="number"
          className="inputField"
        />
      </LabelWrapper>
      <div className="flex flex-row items-center">
        <LabelWrapper labelText="Externt pris / st">
          <input
            {...(register("externalPrice"), { valueAsNumber: true })}
            type="number"
            className="inputField"
          />
        </LabelWrapper>

        <LabelWrapper labelText="Internt pris / st">
          <input
            {...(register("internalPrice"), { valueAsNumber: true })}
            type="number"
            className="inputField"
          />
        </LabelWrapper>
        <div className="inline-flex items-center">
          <input
            {...(register("buyerCanSetPrice"), { valueAsBool: true })}
            type="checkbox"
          />
          <label>Låt köparen föreslå pris</label>
        </div>
      </div>
      <h1>(Frakt Information)</h1>
      <div className="inline-flex items-center">
        <input
          {...(register("canBePickedUp"), { valueAsBool: true })}
          type="checkbox"
        />
        <label>Kan hämtas på plats</label>
      </div>
      <div className="flex flex-row">
        <LabelWrapper labelText="Address">
          <input {...register("adress")} className="inputField" />
        </LabelWrapper>
        <LabelWrapper labelText="Postkod">
          <input {...register("postalCode")} className="inputField" />
        </LabelWrapper>
        <LabelWrapper labelText="Postort">
          <input {...register("city")} className="inputField" />
        </LabelWrapper>
      </div>
      <div className="inline-flex items-center">
        <input
          {...(register("canBeSentByFreight"), { valueAsBool: true })}
          type="checkbox"
        />
        <label>Kan skickas med frakt</label>
      </div>
      <LabelWrapper labelText="Kommentar">
        <input {...register("comment")} className="inputField" />
      </LabelWrapper>
      <LabelWrapper labelText="Kontaktperson">
        <input {...register("contactPerson")} className="inputField" />
      </LabelWrapper>
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

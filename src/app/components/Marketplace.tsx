"use client";

import { FormPageProps } from "@/utils/types";
import { LabelWrapper } from "./LabelWrapper";

export default function Marketplace({ register, setViewState }: FormPageProps) {
  console.log(register);

  return (
    <>
      <h1 className="header1-bold">Hantering för marknadsplats</h1>
      <p className="text-red">Alla priser ska anges exklusive moms*</p>
      <LabelWrapper labelText="Nypris / st">
        <input
          {...register("originalPrice", { valueAsNumber: true })}
          type="number"
          className="inputField"
          placeholder="Nypris / st"
        />
      </LabelWrapper>
      <div className="flex flex-row items-center">
        <LabelWrapper labelText="Externt pris / st">
          <input
            {...register("externalPrice", { valueAsNumber: true })}
            type="number"
            className="inputField"
            placeholder="Externt pris / st"
          />
        </LabelWrapper>

        <LabelWrapper labelText="Internt pris / st">
          <input
            {...register("internalPrice", { valueAsNumber: true })}
            type="number"
            className="inputField"
            placeholder="Internt pris / st"
          />
        </LabelWrapper>
        <div className="inline-flex items-center">
          <input {...register("buyerCanSetPrice")} type="checkbox" />
          <label className="font-bold">Låt köparen föreslå pris</label>
        </div>
      </div>
      <h1 className="header1-bold">(Frakt Information)</h1>
      <div className="inline-flex items-center">
        <input {...register("canBePickedUp")} type="checkbox" />
        <label className="font-bold">Kan hämtas på plats</label>
      </div>
      <div className="flex flex-row">
        <LabelWrapper labelText="Address">
          <input
            {...register("adress")}
            className="inputField"
            placeholder="Upphämtningsadress"
          />
        </LabelWrapper>
        <LabelWrapper labelText="Postkod">
          <input
            {...register("postalCode")}
            className="inputField"
            placeholder="Postkod för upphämtning"
          />
        </LabelWrapper>
        <LabelWrapper labelText="Postort">
          <input
            {...register("city")}
            className="inputField"
            placeholder="Ort för upphämtning"
          />
        </LabelWrapper>
      </div>
      <div className="inline-flex items-center">
        <input {...register("canBeSentByFreight")} type="checkbox" />
        <label className="font-bold">Kan skickas med frakt</label>
      </div>
      <LabelWrapper labelText="Kommentar">
        <input
          {...register("comment")}
          className="inputField"
          placeholder="Ange kompletterande info om prissättningen och eventuella garantier, tex om kostnader tillkommer för demontering och frakt, samt 
möjliga betalningsmetoder såsom faktura eller andra betalsätt."
        />
      </LabelWrapper>
      <LabelWrapper labelText="Kontaktperson">
        <input
          {...register("contactPerson")}
          className="inputField"
          placeholder="Marie Kalmnäs"
        />
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

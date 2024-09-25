"use client";

import { FormPageProps } from "@/utils/types";
import { LabelWrapper } from "./LabelWrapper";

export default function Marketplace({ register, setViewState }: FormPageProps) {
  console.log(register);

  return (
    <>
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          <h1 className="header1-bold">Hantering för marknadsplats</h1>
          <p className="text-red">Alla priser ska anges exklusive moms*</p>
        </div>
        <LabelWrapper labelText="Nypris / st">
          <input
            {...register("originalPrice", { valueAsNumber: true })}
            type="number"
            className="inputField w-[180px]"
            placeholder="Nypris / st"
          />
        </LabelWrapper>
        <div className="flex flex-row items-end gap-4">
          <LabelWrapper labelText="Externt pris / st">
            <input
              {...register("externalPrice", { valueAsNumber: true })}
              type="number"
              className="inputField w-[300px]"
              placeholder="Externt pris / st"
            />
          </LabelWrapper>

          <LabelWrapper labelText="Internt pris / st">
            <input
              {...register("internalPrice", { valueAsNumber: true })}
              type="number"
              className="inputField w-[300px]"
              placeholder="Internt pris / st"
            />
          </LabelWrapper>
          <div className=" flex gap-2 mb-2">
            <input {...register("buyerCanSetPrice")} type="checkbox" />
            <label className="paragraph-bold">Låt köparen föreslå pris</label>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 pt-8">
        <h1 className="header2 font-bold">(Frakt Information)</h1>
        <div className="inline-flex items-center gap-2">
          <input {...register("canBePickedUp")} type="checkbox" />
          <label className="paragraph-bold">Kan hämtas på plats</label>
        </div>
        <div className="flex flex-row gap-4">
          <LabelWrapper labelText="Address">
            <input
              {...register("adress")}
              className="inputField w-[300px]"
              placeholder="Upphämtningsadress"
            />
          </LabelWrapper>
          <LabelWrapper labelText="Postkod">
            <input
              {...register("postalCode")}
              className="inputField w-[300px]"
              placeholder="Postkod för upphämtning"
            />
          </LabelWrapper>
          <LabelWrapper labelText="Postort">
            <input
              {...register("city")}
              className="inputField w-[300px]"
              placeholder="Ort för upphämtning"
            />
          </LabelWrapper>
        </div>
        <div className="inline-flex items-center gap-2">
          <input {...register("canBeSentByFreight")} type="checkbox" />
          <label className="paragraph-bold">Kan skickas med frakt</label>
        </div>
        <LabelWrapper labelText="Kommentar">
          <textarea
            {...register("comment")}
            className="inputField !h-14"
            placeholder="Ange kompletterande info om prissättningen och eventuella garantier, tex om kostnader tillkommer för demontering och frakt, samt 
          möjliga betalningsmetoder såsom faktura eller andra betalsätt."
          />
        </LabelWrapper>
        <LabelWrapper labelText="Kontaktperson">
          <input
            {...register("contactPerson")}
            className="inputField w-[25rem]"
            placeholder="Marie Kalmnäs"
          />
        </LabelWrapper>
      </div>
      <div className="flex flex-row justify-between pt-[3.38rem]">
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

"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { postProduct } from "@/utils/queries";

import { Product, ViewState } from "@/utils/types";

import GeneralInformation from "../components/GeneralInformation";
import LocationStatusAmount from "../components/LocationStatusAmount";
import ProductProperties from "../components/ProductProperties";
import Marketplace from "../components/Marketplace";
import { useState } from "react";
import { redirectToDashboard } from "@/utils/serverActions";

export default function AddProduct() {
  const { register, handleSubmit } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    await postProduct(data);
    await redirectToDashboard();
  };

  const [viewState, setViewState] = useState<ViewState>("GeneralInformation");

  return (
    <>
      <div className="max-w-4xl px-[9rem] pt-[4rem]">
        {/* BreadCrumbs */}
        {/* Navigation */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {viewState === "GeneralInformation" && (
              <GeneralInformation
                register={register}
                setViewState={setViewState}
              />
            )}
            {viewState === "LocationStatusAmount" && (
              <LocationStatusAmount
                register={register}
                setViewState={setViewState}
              />
            )}
            {viewState === "ProductProperties" && (
              <ProductProperties
                register={register}
                setViewState={setViewState}
              />
            )}
            {viewState === "Marketplace" && (
              <Marketplace register={register} setViewState={setViewState} />
            )}
          </form>
        </div>
      </div>
    </>
  );
}

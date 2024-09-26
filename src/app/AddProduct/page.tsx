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
import { Breadcrumbs } from "../components/Breadcrumbs";

export default function AddProduct() {
  const { control, register, handleSubmit, getValues } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    await postProduct(data);
    await redirectToDashboard();
  };

  const [viewState, setViewState] = useState<ViewState>("GeneralInformation");

  return (
    <>
      <div className="px-4 md:px-[9rem] py-[4rem]">
        <Breadcrumbs viewState={viewState} />
        {/* BreadCrumbs */}
        {/* Navigation */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {viewState === "GeneralInformation" && (
              <GeneralInformation
                register={register}
                setViewState={setViewState}
                getValues={getValues}
              />
            )}
            {viewState === "LocationStatusAmount" && (
              <LocationStatusAmount
                register={register}
                setViewState={setViewState}
                control={control}
                getValues={getValues}
              />
            )}
            {viewState === "ProductProperties" && (
              <ProductProperties
                register={register}
                setViewState={setViewState}
                getValues={getValues}
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

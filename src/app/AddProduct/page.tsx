"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import { postProduct } from "@/utils/queries";

import { Product } from "@/utils/types";

import GeneralInformation from "../components/GeneralInformation";
import LocationStatusAmount from "../components/LocationStatusAmount";
import ProductProperties from "../components/ProductProperties";
import Marketplace from "../components/Marketplace";

export default function AddProduct() {
  const { register, handleSubmit } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = (data) => postProduct(data);

  return (
    <>
      <div className="max-w-4xl px-[9rem] pt-[4rem]">
        {/* BreadCrumbs */}
        {/* Navigation */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <GeneralInformation register={register} />
            <LocationStatusAmount register={register} />
            <ProductProperties register={register} />
            <Marketplace register={register} />
          </form>
        </div>
      </div>
    </>
  );
}

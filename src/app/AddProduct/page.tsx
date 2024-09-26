"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import {
  getCategories,
  getFirstSubCat,
  getProjects,
  getSecondSubCat,
  postProduct,
} from "@/utils/queries";

import {
  Categories,
  FirstSubCategories,
  Product,
  Project,
  SecondSubCategories,
  ViewState,
} from "@/utils/types";

import GeneralInformation from "../components/GeneralInformation";
import LocationStatusAmount from "../components/LocationStatusAmount";
import ProductProperties from "../components/ProductProperties";
import Marketplace from "../components/Marketplace";
import { useEffect, useState } from "react";
import { redirectToDashboard } from "@/utils/serverActions";
import { Breadcrumbs } from "../components/Breadcrumbs";

export default function AddProduct() {
  const { control, register, handleSubmit, getValues } = useForm<Product>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    await postProduct(data);
    await redirectToDashboard();
  };

  const [viewState, setViewState] = useState<ViewState>("GeneralInformation");

  const [categories, setCategories] = useState<Categories[]>();
  const [firstSubCategories, setFirstSubCategories] =
    useState<FirstSubCategories[]>();
  const [secondSubCategories, setSecondSubCategories] =
    useState<SecondSubCategories[]>();
  const [projects, setProjects] = useState<Project[]>();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        const firstSubCategoryData = await getFirstSubCat();
        const secondSubCategoryData = await getSecondSubCat();
        const projectsData = await getProjects();
        setCategories(categoryData);
        setFirstSubCategories(firstSubCategoryData);
        setSecondSubCategories(secondSubCategoryData);
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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
                categories={categories}
                firstSubCategories={firstSubCategories}
                secondSubCategories={secondSubCategories}
                projects={projects}
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

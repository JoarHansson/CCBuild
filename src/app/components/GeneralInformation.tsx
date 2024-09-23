"use client";

import { useEffect, useState } from "react";

import {
  getCategories,
  getFirstSubCat,
  getProjects,
  getSecondSubCat,
} from "@/utils/queries";

import {
  Categories,
  FirstSubCategories,
  SecondSubCategories,
  FormPageProps,
  Project,
} from "@/utils/types";
import Link from "next/link";

export default function GeneralInformation({
  register,
  setViewState,
}: FormPageProps) {
  const [categories, setCategories] = useState<Categories[]>();
  const [firstSubCategories, setFirstSubCategories] =
    useState<FirstSubCategories[]>();
  const [secondSubCategories, setSecondSubCategories] =
    useState<SecondSubCategories[]>();
  const [projects, setProjects] = useState<Project[]>();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

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

  const handleCategoryChange = (event: any) => {
    event.target.value === "" ? setIsGray(true) : setIsGray(false);
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
    console.log(event.target.value);
    console.log(event.target);
  };
  const handleSubCategoryChange = (event: any) => {
    event.target.value === "" ? setIsGray(true) : setIsGray(false);
    setSelectedSubCategory(event.target.value);
    console.log(event.target.value);
  };

  const [isGray, setIsGray] = useState(true);
  /* Add more states for subCategories */

  console.log(projects);

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* change when dashboard has "global state" and fetch of project:   */}
        <div className="flex flex-col gap-3">
          <h2 className="header1-bold">Generell Information</h2>
          {/* Project --- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="projectId" className="paragraph-bold">
              Projekt <span className="text-red">*</span>{" "}
            </label>
            <select
              {...(register("projectId"), { valueAsNumber: true })}
              disabled
              className="inputField w-[412px]"
            >
              {projects?.map((project) => {
                return (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                );
              })}
            </select>
          </div>
          {/* --- Project */}

          {/* Categories --- */}
          <div className="flex gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="paragraph-bold">
                Produktkategori #1 <span className="text-red">*</span>{" "}
              </label>
              <select
                {...register("category", { required: true })}
                className="inputField w-[412px]"
                style={isGray ? { color: "#767676" } : { color: "#151515" }}
                onChange={handleCategoryChange}
              >
                <option value="">Välj Kategori</option>
                {categories?.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.name}
                      id={category.id.toString()}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            {selectedCategory !== "" ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="firstSubCategory" className="paragraph-bold">
                  Produktkategori #2
                </label>
                <select
                  {...register("firstSubCategory", { required: true })}
                  className="inputField w-[196px]"
                  style={isGray ? { color: "#767676" } : { color: "#151515" }}
                  onChange={handleSubCategoryChange}
                >
                  <option value="">Välj Kategori</option>
                  {firstSubCategories
                    ?.filter((subCategory) => {
                      const cat = categories?.find(
                        (cat) => cat.name === selectedCategory
                      );
                      return subCategory.categoryId === cat?.id;
                    })
                    .map((subCat) => {
                      return (
                        <option
                          key={subCat.id}
                          value={subCat.name}
                          id={subCat.id.toString()}
                        >
                          {subCat.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            ) : (
              ""
            )}
            {selectedSubCategory !== "" &&
            secondSubCategories?.find((o) => {
              const matchingSubCat = firstSubCategories?.find(
                (subCat) => subCat.name === selectedSubCategory
              );

              return o.firstSubCategoryId === matchingSubCat?.id;
            }) ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="secondSubCategory" className="paragraph-bold">
                  Produktkategori #3
                </label>
                <select
                  {...register("secondSubCategory")}
                  className="inputField w-[196px]"
                  style={isGray ? { color: "#767676" } : { color: "#151515" }}
                >
                  <option value="">Välj Kategori</option>
                  {secondSubCategories
                    ?.filter((subCategory) => {
                      const cat = firstSubCategories?.find(
                        (cat) => cat.name === selectedSubCategory
                      );
                      return subCategory.firstSubCategoryId === cat?.id;
                    })
                    .map((subCat) => {
                      return (
                        <option key={subCat.id} value={subCat.name}>
                          {subCat.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            ) : (
              ""
            )}
          </div>
          {/* --- Categories */}

          {/* Product name --- */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="paragraph-bold">
              Produktnamn <span className="text-red">*</span>{" "}
            </label>
            <input
              {...register("name")}
              className="inputField w-[412px]"
              placeholder="Produktnamn"
            />
          </div>
          {/* --- Product name */}
        </div>

        {/* Product info --- */}
        <div className="flex flex-wrap gap-5">
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="manufacturer" className="paragraph-bold">
              Tillverkare / Leverantör
            </label>
            <input
              {...register("manufacturer")}
              className="inputField w-full"
              placeholder="Ange tillverkare eller leverantör"
            />
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="productNumber" className="paragraph-bold">
              Artikelnummer
            </label>
            <input
              {...register("productNumber")}
              className="inputField w-full"
              placeholder="Ange tillverkarens/leverantörens artikelnummer"
            />
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="yearOfMake" className="paragraph-bold">
              Tillverkningsår
            </label>
            <input
              {...register("yearOfMake")}
              className="inputField w-full"
              placeholder="Ange uppskattat tillverkningsår"
            />
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="yearOfPurchase" className="paragraph-bold">
              Tillverkningsår
            </label>
            <input
              {...register("yearOfPurchase")}
              className="inputField w-full"
              placeholder="Uppskattat inköpsår"
            />
          </div>
        </div>
        {/* --- Product info */}

        {/* Product condition --- */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="aestheticCondition" className="paragraph-bold">
              Estetiskt skick
            </label>
            <select
              {...register("aestheticCondition")}
              className="inputField w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="functionalCondition" className="paragraph-bold">
              Funktionellt skick
            </label>
            <select
              {...register("functionalCondition")}
              className="inputField w-full"
            />
          </div>
        </div>
        {/* --- Product condition */}

        {/* Product image --- */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="imageUrls" className="paragraph-bold">
              Produkt bilder
            </label>
            <input
              {...register("imageUrls")}
              type="file"
              className="inputField w-full"
            />
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="internalId" className="paragraph-bold">
              Eget ID-nummer
            </label>
            <input
              {...register("internalId")}
              className="inputField w-full"
              placeholder="Eget ID-nummer"
            />
          </div>
        </div>
        {/* --- Product image  */}

        {/* Product descripton --- */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="description" className="paragraph-bold">
              Produktbeskrivning
            </label>
            <textarea
              {...register("description")}
              className="inputField w-full min-h-[128px]"
            />
          </div>
        </div>
        {/* --- Product descripton */}
        {/* Buttons --- */}
        <div className="flex justify-between w-full">
          <div className="flex gap-6">
            <Link href={"/"} className="button-outline">
              Föregående
            </Link>
            <button
              onClick={() => setViewState("LocationStatusAmount")}
              className="button-fill"
            >
              Nästa
            </button>
          </div>
          <button type="submit" className="button-outline">
            Spara
          </button>
        </div>
        {/* --- Buttons */}
      </div>
    </>
  );
}

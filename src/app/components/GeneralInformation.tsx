"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import nostar from "/public/nostar.png";

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

export default function GeneralInformation({
  register,
  setViewState,
  getValues,
}: FormPageProps) {
  const [categories, setCategories] = useState<Categories[]>();
  const [firstSubCategories, setFirstSubCategories] =
    useState<FirstSubCategories[]>();
  const [secondSubCategories, setSecondSubCategories] =
    useState<SecondSubCategories[]>();
  const [projects, setProjects] = useState<Project[]>();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFirstSubCategory, setSelectedFirstSubCategory] = useState("");
  const [selectedSecondSubCategory, setSelectedSecondSubCategory] =
    useState("");
  const [aestheticStars, setAestheticStars] = useState(0);
  const [functionalStars, setFunctionalStars] = useState(0);

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

  const [isGray, setIsGray] = useState({
    category: true,
    firstSubCategory: true,
    secondSubCategory: true,
  });

  const handleCategoryChange = (event: any) => {
    const value = event.target.value;
    setIsGray({
      ...isGray,
      category: false,
      firstSubCategory: true,
      secondSubCategory: true,
    });
    setSelectedCategory(value);
    setSelectedFirstSubCategory("");
  };

  const handleFirstSubCategoryChange = (event: any) => {
    const value = event.target.value;
    setIsGray({
      ...isGray,
      firstSubCategory: false,
      secondSubCategory: true,
    });
    setSelectedFirstSubCategory(value);
  };

  const handleSecondSubCategoryChange = (event: any) => {
    const value = event.target.value;
    setIsGray({
      ...isGray,
      secondSubCategory: false,
    });
    setSelectedSecondSubCategory(value);
  };

  const handleAstheticStarsChange = (event: any) => {
    setAestheticStars(event.target.value);
  };
  const handleFunctionalStarsChange = (event: any) => {
    setFunctionalStars(event.target.value);
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  const [redBorder, setRedBorder] = useState(false);
  const handlePageChange = () => {
    if (getValues) {
      const category = getValues("category");
      const subCategory = getValues("firstSubCategory");
      const name = getValues("name");

      if (category !== "" && subCategory !== "" && name !== "") {
        setViewState("LocationStatusAmount");
      } else {
        setRedBorder(true);
      }
    } else {
      console.error("getValues is undefined");
    }
  };

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
              className={`inputField w-full md:w-[412px] ${
                redBorder ? "!border-red" : ""
              }`}
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
          <div className="flex md:flex-row flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="paragraph-bold">
                Produktkategori #1 <span className="text-red">*</span>{" "}
              </label>
              <select
                {...register("category", { required: true })}
                className={`inputField w-full md:w-[412px] ${
                  redBorder ? "!border-red" : ""
                }`}
                style={
                  isGray.category ? { color: "#767676" } : { color: "#151515" }
                }
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
                  className={`inputField w-full md:w-[412px] ${
                    redBorder ? "!border-red" : ""
                  }`}
                  style={
                    isGray.firstSubCategory
                      ? { color: "#767676" }
                      : { color: "#151515" }
                  }
                  onChange={handleFirstSubCategoryChange}
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
            {selectedFirstSubCategory !== "" &&
            secondSubCategories?.find((o) => {
              const matchingSubCat = firstSubCategories?.find(
                (subCat) => subCat.name === selectedFirstSubCategory
              );

              return o.firstSubCategoryId === matchingSubCat?.id;
            }) ? (
              <div className="flex flex-col gap-2">
                <label htmlFor="secondSubCategory" className="paragraph-bold">
                  Produktkategori #3
                </label>
                <select
                  {...register("secondSubCategory")}
                  className="inputField w-full md:w-[196px]"
                  style={
                    isGray.secondSubCategory
                      ? { color: "#767676" }
                      : { color: "#151515" }
                  }
                  onChange={handleSecondSubCategoryChange}
                >
                  <option value="">Välj Kategori</option>
                  {secondSubCategories
                    ?.filter((subCategory) => {
                      const cat = firstSubCategories?.find(
                        (cat) => cat.name === selectedFirstSubCategory
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
              className={`inputField w-full md:w-[412px] ${
                redBorder ? "!border-red" : ""
              }`}
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
              {...register("yearOfMake", { valueAsNumber: true })}
              className="inputField w-full"
              placeholder="Ange uppskattat tillverkningsår"
            />
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="yearOfPurchase" className="paragraph-bold">
              Inköpsår
            </label>
            <input
              {...register("yearOfPurchase", { valueAsNumber: true })}
              className="inputField w-full"
              placeholder="Uppskattat inköpsår"
            />
          </div>
        </div>
        {/* --- Product info */}

        {/* Product condition --- */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-[412px]">
            <label
              htmlFor="aestheticCondition"
              className="paragraph-bold flex gap-2"
            >
              Estetiskt skick
              <Image
                src={`/${aestheticStars}-star.png`}
                alt="Ej bedömd"
                width={80}
                height={16}
              />
            </label>
            <select
              {...register("aestheticCondition", { valueAsNumber: true })}
              className="inputField w-full"
              onChange={handleAstheticStarsChange}
            >
              <option value="0">Ej bedömd</option>
              <option value="1">Skada går inte att åtgärda</option>
              <option value="2">Skada svår att åtgärda</option>
              <option value="3">Skada kan lagas av proffs</option>
              <option value="4">Skada kan lagas av lekman</option>
              <option value="5">Perfekt skick</option>
            </select>
          </div>
          <div className="flex flex-col gap-2 w-[412px]">
            <label
              htmlFor="functionalCondition"
              className="paragraph-bold flex gap-2"
            >
              Funktionellt skick
              <Image
                src={`/${functionalStars}-star.png`}
                alt="Ej bedömd"
                width={80}
                height={16}
              />
            </label>
            <select
              {...register("functionalCondition", { valueAsNumber: true })}
              className="inputField w-full"
              onChange={handleFunctionalStarsChange}
            >
              <option value="0">Ej bedömd</option>
              <option value="1">Skada går inte att åtgärda</option>
              <option value="2">Skada svår att åtgärda</option>
              <option value="3">Skada kan lagas av proffs</option>
              <option value="4">Skada kan lagas av lekman</option>
              <option value="5">Perfekt skick</option>
            </select>
          </div>
        </div>
        {/* --- Product condition */}

        {/* Product image --- */}
        <div className="flex gap-5">
          <div className="flex flex-col gap-2 w-[412px]">
            <label htmlFor="imageUrls" className="paragraph-bold ">
              Produktbilder
            </label>
            <div
              className="inputField cursor-pointer !h-[92px] flex items-center justify-center gap-2"
              onClick={handleClick}
            >
              <Image src="/upload.svg" width={24} height={24} alt="upload" />
              Dra och släpp bilder här eller bläddra
            </div>
            <input
              {...register("imageUrls")}
              type="file"
              ref={hiddenFileInput}
              className="hidden"
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

            <button onClick={handlePageChange} className="button-fill">
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

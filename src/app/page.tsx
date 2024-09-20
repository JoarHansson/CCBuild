"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  getCategories,
  getFirstSubCat,
  getSecondSubCat,
  postProduct,
} from "@/utils/queries";

import {
  Product,
  Categories,
  FirstSubCategories,
  SecondSubCategories,
} from "@/utils/types";

export default function Home() {
  const { register, handleSubmit } = useForm<Product>();
  const [categories, setCategories] = useState<Categories[]>();
  const [firstSubCategories, setFirstSubCategories] =
    useState<FirstSubCategories[]>();
  const [secondSubCategories, setSecondSubCategories] =
    useState<SecondSubCategories[]>();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        const firstSubCategoryData = await getFirstSubCat();
        const secondSubCategoryData = await getSecondSubCat();
        setCategories(categoryData);
        setFirstSubCategories(firstSubCategoryData);
        setSecondSubCategories(secondSubCategoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategory("");
    console.log(event.target.value);
    console.log(event.target);
  };
  const handleSubCategoryChange = (event: any) => {
    setSelectedSubCategory(event.target.value);
    console.log(event.target.value);
  };

  const onSubmit: SubmitHandler<Product> = (data) => postProduct(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <select
          {...register("category", { required: true })}
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
        {selectedCategory !== "" ? (
          <select
            {...register("firstSubCategory", { required: true })}
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
          <select {...register("secondSubCategory")}>
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
        ) : (
          ""
        )}
        <input type="submit" />
      </form>
    </>
  );
}

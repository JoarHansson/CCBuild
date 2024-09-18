"use client";

import {
  getCategories,
  getFirstSubCat,
  getSecondSubCat,
} from "@/utils/queries";
import { useEffect, useState } from "react";

type Categories = {
  id: number;
  name: string;
};

type FirstSubCategories = {
  id: number;
  name: string;
  categoryId: number | null;
};

type SecondSubCategories = {
  id: number;
  name: string;
  firstSubCategoryId: number | null;
};

export default function Home() {
  const [categories, setCategories] = useState<Categories[]>();
  const [firstSubCategories, setFirstSubCategories] =
    useState<FirstSubCategories[]>();
  const [secondSubCategories, setSecondSubCategories] =
    useState<SecondSubCategories[]>();

  const [selectedCategory, setSelectedCategory] = useState("Välj");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Välj Sub");
  const [selectedSecondSubCategory, setSelectedSecondSubCategory] =
    useState("");

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
    setSelectedSubCategory("Välj Sub");
    console.log(event.target.value);
  };
  const handleSubCategoryChange = (event: any) => {
    setSelectedSubCategory(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div>
        <select onChange={handleCategoryChange}>
          <option value="Välj">Välj Kategori</option>
          {categories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {selectedCategory !== "Välj" ? (
          <select onChange={handleSubCategoryChange}>
            <option value="Välj Sub">Välj Kategori</option>
            {firstSubCategories
              ?.filter(
                (subCategory) =>
                  subCategory.categoryId?.toString() === selectedCategory
              )
              .map((subCat) => {
                return (
                  <option key={subCat.id} value={subCat.id}>
                    {subCat.name}
                  </option>
                );
              })}
          </select>
        ) : (
          ""
        )}
        {selectedSubCategory !== "Välj Sub" &&
        secondSubCategories?.find(
          (o) => o.firstSubCategoryId?.toString() === selectedSubCategory
        ) ? (
          <select>
            <option>Välj Kategori</option>
            {secondSubCategories
              ?.filter(
                (subCategory) =>
                  subCategory.firstSubCategoryId?.toString() ===
                  selectedSubCategory
              )
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
      </div>
    </>
  );
}

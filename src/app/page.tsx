"use client";

import {
  getCategories,
  getFirstSubCat,
  getSecondSubCat,
  postProduct,
} from "@/utils/queries";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

type FirstSubCategory = {
  id: number;
  name: string;
  categoryId: number | null;
};

type SecondSubCategory = {
  id: number;
  name: string;
  firstSubCategoryId: number | null;
};

export default function Home() {
  const [categories, setCategories] = useState<Category[]>();
  const [firstSubCategories, setFirstSubCategories] =
    useState<FirstSubCategory[]>();
  const [secondSubCategories, setSecondSubCategories] =
    useState<SecondSubCategory[]>();

  const [selectedCategory, setSelectedCategory] = useState("Välj");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Välj Sub");
  const [selectedSecondSubCategory, setSelectedSecondSubCategory] =
    useState("");

  const [dataToSubmit, setDataToSubmit] = useState({
    // numbers for testing purposes
    category: "1",
    firstSubCategory: "2",
    secondSubCategory: "3",
  });

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
  };

  const handleSubCategoryChange = (event: any) => {
    setSelectedSubCategory(event.target.value);
  };

  const handleSecondSubCategoryChange = (event: any) => {
    setSelectedSecondSubCategory(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const selectedCategoryName = categories?.find(
      (category) => category.id.toString() === selectedCategory
    );

    const selectedSubCategoryName = firstSubCategories?.find(
      (category) => category.id.toString() === selectedSubCategory
    );

    const selectedSecondSubCategoryName = secondSubCategories?.find(
      (category) => category.id.toString() === selectedSecondSubCategory
    );

    setDataToSubmit({
      category: selectedCategoryName?.name || "4",
      firstSubCategory: selectedSubCategoryName?.name || "5",
      secondSubCategory: selectedSecondSubCategoryName?.name || "6",
    });

    const formData = new FormData();
    formData.append("category", dataToSubmit.category);
    formData.append("firstSubCategory", dataToSubmit.firstSubCategory);
    formData.append("secondSubCategory", dataToSubmit.secondSubCategory);

    try {
      await postProduct(formData);
      console.log("Product created successfully");
    } catch (error) {
      console.error("Failed to create product", error);
    }
  };

  // for testing, remove later
  useEffect(() => {
    console.log(dataToSubmit);
  }, [handleSubmit]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <select onChange={handleCategoryChange}>
            <option value="Välj">Välj Kategori</option>
            {categories?.map((category) => {
              return (
                <option
                  key={category.id}
                  value={category.id}
                  id={category.name}
                >
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
                    <option key={subCat.id} value={subCat.id} id={subCat.name}>
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
            <select onChange={handleSecondSubCategoryChange}>
              <option>Välj Kategori</option>
              {secondSubCategories
                ?.filter(
                  (subCategory) =>
                    subCategory.firstSubCategoryId?.toString() ===
                    selectedSubCategory
                )
                .map((subCat) => {
                  return (
                    <option key={subCat.id} value={subCat.id} id={subCat.name}>
                      {subCat.name}
                    </option>
                  );
                })}
            </select>
          ) : (
            ""
          )}
        </div>
        <button type="submit">registrera produkt</button>
      </form>
    </>
  );
}

"use server";
import prisma from "@/utils/prisma";
import { Product } from "./types";

export const getCategories = async () => {
  const categories = await prisma.category.findMany();
  return categories;
};

export const getFirstSubCat = async () => {
  const firstSubCategories = await prisma.firstSubCategory.findMany();
  return firstSubCategories;
};

export const getSecondSubCat = async () => {
  const secondSubCategories = await prisma.secondSubCategory.findMany();
  return secondSubCategories;
};

export const postProduct = async (formData: Product) => {
  console.log(formData);

  await prisma.product.create({
    data: {
      category: formData.category as string,
      firstSubCategory: formData.firstSubCategory as string,
      secondSubCategory: formData.secondSubCategory as string,
    },
  });
};

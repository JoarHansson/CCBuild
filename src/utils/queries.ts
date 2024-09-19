"use server";
import prisma from "@/utils/prisma";

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

type Product = {
  category: string;
  firstSubCategory: string;
  secondSubCategory: string;
};

export const postProduct = async (formData: FormData) => {
  console.log(formData);

  await prisma.product.create({
    data: {
      category: formData.get("category") as string,
      firstSubCategory: formData.get("firstSubCategory") as string,
      secondSubCategory: formData.get("secondSubCategory") as string,
    },
  });
};

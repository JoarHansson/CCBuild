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

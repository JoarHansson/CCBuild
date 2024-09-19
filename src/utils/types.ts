export type Categories = {
  id: number;
  name: string;
};

export type FirstSubCategories = {
  id: number;
  name: string;
  categoryId: number | null;
};

export type SecondSubCategories = {
  id: number;
  name: string;
  firstSubCategoryId: number | null;
};

export type Product = {
  category: string;
  firstSubCategory: string;
  secondSubCategory: string;
};

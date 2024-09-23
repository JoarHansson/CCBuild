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
      <div className="flex flex-col">
        {/* change when dashboard has "global state" and fetch of project:   */}
        <select {...(register("projectId"), { valueAsNumber: true })} disabled>
          {projects?.map((project) => {
            return (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            );
          })}
        </select>

        <div>
          <select
            {...register("category", { required: true })}
            className="inputField "
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
          {selectedCategory !== "" ? (
            <select
              {...register("firstSubCategory", { required: true })}
              className="inputField"
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
            <select
              {...register("secondSubCategory")}
              className="inputField"
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
          ) : (
            ""
          )}
        </div>
        <input
          {...register("name")}
          className="inputField"
          placeholder="Produktnamn"
        />
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
      </div>
    </>
  );
}

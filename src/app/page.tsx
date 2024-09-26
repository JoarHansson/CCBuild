"use client";

import Link from "next/link";

import { getProducts } from "@/utils/queries";
import { useEffect, useState } from "react";
import { Product } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState<Product[]>();
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);

        const categories = productsData.map((product) => product.category);
        const uniqueCategoriesArray = Array.from(new Set(categories));
        setUniqueCategories(uniqueCategoriesArray);
        console.log(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="px-4 md:px-[9rem] py-[4rem]">
        <div className="flex pb-4">
          <h1 className="header1">Översikt</h1>
          <Image
            src="/crumb-arrow.svg"
            alt="arrow"
            width={24}
            height={24}
            style={{ height: "24px", width: "auto" }}
          />
          <h1 className="header1">Projekt</h1>
          <Image
            src="/crumb-arrow.svg"
            alt="arrow"
            width={24}
            height={24}
            style={{ height: "24px", width: "auto" }}
          />
          <h1 className="header1">Grupp 4</h1>
        </div>
        <div
          className="bg-darkBlue w-80% h-[350px] flex justify-end items-end rounded-[5px] mb-8"
          style={{
            boxShadow:
              "0px 4px 8px 0px rgba(0, 0, 0, 0.20), 0px 6px 20px 0px rgba(0, 0, 0, 0.19)",
          }}
        >
          <div className="flex justify-between w-full px-12 py-6 text-textWhite">
            <div className="flex flex-col gap-4">
              <h2 className="header1-bold">Grupp 4</h2>
              <p className="paragraph-bold">Utbildningskonto - Yrgo</p>
            </div>
            <div className="flex items-end gap-2 ">
              <Link
                href={"/AddProduct"}
                className="flex gap-1 bg-textWhite text-lightBlue font-bold text-xs rounded-full border border-lightBlue py-2 px-4"
              >
                <Image
                  src="/add-sign.svg"
                  alt="add sign"
                  width={17}
                  height={17}
                />
                Lägg till produkt
              </Link>
              <button className="p-2 bg-textWhite text-lightBlue font-bold text-xs rounded-full border border-lightBlue py-2 px-4">
                Duplicera Projekt
              </button>
              <button className="p-2 bg-textWhite text-lightBlue font-bold text-xs rounded-full border border-lightBlue py-2 px-4">
                Importera
              </button>
              <button className="flex gap-1 p-2 bg-textWhite text-lightBlue font-bold text-xs rounded-full border border-lightBlue py-2 px-4">
                Visa rapport
                <Image
                  src="/down-arrow.svg"
                  alt="arrow"
                  width={17}
                  height={17}
                />
              </button>
              <button className="flex gap-1 p-2 bg-textWhite text-lightBlue font-bold text-xs rounded-full border border-lightBlue py-2 px-4">
                Projekt aktivt
                <Image
                  src="/down-arrow.svg"
                  alt="arrow"
                  width={17}
                  height={17}
                />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto">
          <nav className="flex space-x-4 mb-8">
            <a href="#" className="paragraph-bold uppercase">
              produkter
            </a>
            <a href="#" className="paragraph uppercase">
              Projektinformation
            </a>
            <a href="#" className="paragraph uppercase">
              Planritning
            </a>
            <a href="#" className="paragraph uppercase">
              Användare
            </a>
            <a href="#" className="paragraph uppercase">
              Revisionshistorik
            </a>
          </nav>

          <div className="grid grid-cols-4 gap-4 ">
            <div className="col-span-1 pr-4 border-r border-r-lightGray">
              <div className="flex justify-between">
                <h2 className="text-xl">Projektinformation</h2>
                <Image
                  src="/Button-Edit.svg"
                  alt="edit"
                  width={36}
                  height={36}
                />
              </div>
              <form>
                <div className="mb-4">
                  <label className="paragraph-bold">Projektnamn</label>
                  <input
                    type="text"
                    className="inputField w-full"
                    placeholder="Produktnamn, mm."
                  />
                </div>
                <div className="mb-4">
                  <label className="paragraph-bold">Land</label>
                  <input
                    type="text"
                    className="inputField w-full"
                    placeholder="Alla"
                  />
                </div>
                <div className="mb-4">
                  <label className="paragraph-bold">Region</label>
                  <select className="inputField w-full">
                    <option>Välj...</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="paragraph-bold">Projektbeskrivning</label>
                  <textarea
                    className="inputField w-full"
                    placeholder="Skriv något..."
                  ></textarea>
                </div>
              </form>
            </div>

            <div className="col-span-3">
              <div className="flex flex-col mb-10 gap-4 px-6">
                <div className="flex space-x-2">
                  {uniqueCategories.map((category, index) => (
                    <div key={index}>
                      <p className="paragraph bg-inputBg py-2 px-4 rounded-[50px]">
                        {category}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2 bg-inputBg justify-end items-center p-4 gap-4">
                  <button className="p-2 bg-gray-200 rounded bg-textWhite">
                    <Image src="/list.svg" alt="grid" width={25} height={25} />
                  </button>
                  <button className="p-2 bg-gray-200 rounded bg-textBlack">
                    <Image src="/grid.svg" alt="grid" width={25} height={25} />
                  </button>
                  <div className="bg-textWhite pl-3 pr-6 flex  h-10 rounded items-center justify-center">
                    <p className="">{products?.length}</p>
                  </div>
                  <div className="bg-textWhite pl-3 pr-6 flex h-10 rounded items-center justify-center">
                    <p className="">Uppdaterad</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 px-6">
                {products?.map((product) => {
                  return (
                    <div
                      className="cursor-pointer"
                      key={product.id}
                      onClick={() => router.push(`/${product.id}`)}
                    >
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src="/image-placeholder-card.png"
                          alt="image placeholder"
                          fill
                          style={{ objectFit: "cover" }}
                          priority={false}
                        />
                      </div>
                      <p className="text-[10px] mb-1">
                        {`${product.category} > ${product.firstSubCategory} ${
                          product.secondSubCategory
                            ? `> ${product.secondSubCategory}`
                            : ""
                        }`}
                      </p>
                      <h2 className="header2-bold">{product.name}</h2>
                      <div className="flex justify-between">
                        <p className="paragraph">CCbuild Nr.</p>
                        <p className="paragraph"> {product.id}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="paragraph">Estetiskt skick</p>
                        {product.aestheticCondition === null ? (
                          <Image
                            src={`/0-star.png`}
                            alt="Ej bedömd"
                            width={80}
                            height={16}
                          />
                        ) : (
                          <Image
                            src={`/${product.aestheticCondition}-star.png`}
                            alt="Ej bedömd"
                            width={80}
                            height={16}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="paragraph">Funktionellt skick</p>
                        {product.functionalCondition === null ? (
                          <Image
                            src={`/0-star.png`}
                            alt="Ej bedömd"
                            width={80}
                            height={16}
                          />
                        ) : (
                          <Image
                            src={`/${product.functionalCondition}-star.png`}
                            alt="Ej bedömd"
                            width={80}
                            height={16}
                          />
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="paragraph">Datum tillgänglig</p>
                        <p className="paragraph">2024-09-27</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="paragraph">Totalt antal</p>
                        <p className="paragraph">
                          {product.ProductVariant.reduce(
                            (accumulator, item) => {
                              if (item.amount === null) {
                                return (accumulator += 0);
                              } else {
                                return (accumulator += item.amount);
                              }
                            },
                            0
                          )}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="paragraph">Total klimatbesparing</p>
                        <p className="paragraph">N/A</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="paragraph">Total mängd</p>
                        <p className="paragraph">N/A</p>
                      </div>
                      <br />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

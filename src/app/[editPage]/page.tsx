"use client";
import { usePathname } from "next/navigation";
import { getProduct } from "@/utils/queries";
import { useEffect, useState } from "react";
import { Product } from "@/utils/types";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import Image from "next/image";
import { LabelWrapper } from "../components/LabelWrapper";
import Link from "next/link";

export default function EditPage() {
  const [product, setProduct] = useState<Product | null>();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const pathname = parseInt(usePathname().slice(1));

  // set product logic:
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(pathname);
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, []);

  // set category logic:
  useEffect(() => {
    if (product !== null && product !== undefined) {
      setSelectedCategory(product.category);
    }
    console.log(selectedCategory);
  }, [product]);

  // dropdown visibility logic:
  const [dropdownIsVisible, setDropdownIsVisible] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (index: number) => {
    setDropdownIsVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // scroll-to-top logic:
  const isBrowser = () => typeof window !== "undefined";

  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Header />
      <form className="px-4 md:px-[9rem] py-[4rem]">
        <div className="flex flex-row pb-[1.59rem]">
          <h1 className="header1">Översikt</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1">Projekt</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1">Grupp 4</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1-bold">Skapa ny produkt</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1-bold">{product?.name}</h1>
        </div>
        <div className="flex flex-row gap-4 items-start justify-between">
          <div className="flex flex-row gap-4">
            <Image
              src="/image-placeholder-landscape.png"
              alt="product image"
              height={201}
              width={330}
            />
            <div className="flex flex-col gap-4">
              <h1 className="header1-bold !text-darkBlue">{product?.name}</h1>
              <p className="paragraph text-darkBlue">{product?.id}</p>
              <p className="paragraph text-darkBlue">Grupp 4</p>
              <div className="flex flex-row gap-4">
                <Image
                  src="/Button-duplicate.svg"
                  height={42}
                  width={141}
                  alt="duplicera"
                />
                <Image
                  src="/Button-move.svg"
                  height={42}
                  width={115}
                  alt="flytta"
                />
                <Image
                  src="/Button-delete.svg"
                  height={42}
                  width={119}
                  alt="radera"
                />
              </div>
            </div>
          </div>
          <Link href="/">
            <Image
              className="cursor-pointer"
              src="/Button-dash.svg"
              width={235}
              height={40}
              alt="tillbaka"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-8 pt-10">
          {/* change when dashboard has "global state" and fetch of project:   */}
          <div className="flex flex-col gap-3">
            <h2 className="header1-bold">Generell Information</h2>
            {/* Project --- */}
            <div className="flex flex-col gap-2">
              <label htmlFor="projectId" className="paragraph-bold">
                Projekt <span className="text-red">*</span>{" "}
              </label>
              <select className="inputField w-full md:w-[412px]">
                <option>Grupp 4</option>
              </select>
            </div>
            {/* --- Project */}

            {/* Categories --- */}
            <div className="flex md:flex-row flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="paragraph-bold">
                  Produktkategori #1 <span className="text-red">*</span>{" "}
                </label>
                <select className="inputField w-full md:w-[412px]">
                  <option value="">{product?.category}</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="firstSubCategory" className="paragraph-bold">
                  Produktkategori #2
                </label>
                <select className={`inputField w-full md:w-[412px]`}>
                  <option value="">{product?.firstSubCategory}</option>
                </select>
              </div>
              {product?.secondSubCategory !== null && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="secondSubCategory" className="paragraph-bold">
                    Produktkategori #3
                  </label>
                  <select className="inputField w-full md:w-[196px]">
                    <option value="">{product?.secondSubCategory}</option>
                  </select>
                </div>
              )}
            </div>
            {/* --- Categories */}

            {/* Product name --- */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="paragraph-bold">
                Produktnamn <span className="text-red">*</span>{" "}
              </label>
              <input
                className={`inputField w-full md:w-[412px]`}
                value={product?.name}
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
                className="inputField w-full"
                value={product?.manufacturer || ""}
              />
            </div>
            <div className="flex flex-col gap-2 w-[412px]">
              <label htmlFor="productNumber" className="paragraph-bold">
                Artikelnummer
              </label>
              <input
                className="inputField w-full"
                placeholder="Ange tillverkarens/leverantörens artikelnummer"
                value={product?.productNumber || ""}
              />
            </div>
            <div className="flex flex-col gap-2 w-[412px]">
              <label htmlFor="yearOfMake" className="paragraph-bold">
                Tillverkningsår
              </label>
              <input
                className="inputField w-full"
                placeholder="Ange uppskattat tillverkningsår"
                value={product?.yearOfMake || "2024"}
              />
            </div>
            <div className="flex flex-col gap-2 w-[412px]">
              <label htmlFor="yearOfPurchase" className="paragraph-bold">
                Inköpsår
              </label>
              <input
                className="inputField w-full"
                placeholder="Uppskattat inköpsår"
                value={product?.yearOfPurchase || ""}
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
                  src={`/${
                    product?.aestheticCondition !== undefined &&
                    product?.aestheticCondition !== null
                      ? product.aestheticCondition
                      : 0
                  }-star.png`}
                  alt="Ej bedömd"
                  width={80}
                  height={16}
                />
              </label>
              <select className="inputField w-full">
                <option value="0" selected={product?.aestheticCondition === 0}>
                  Ej bedömd
                </option>
                <option value="1" selected={product?.aestheticCondition === 1}>
                  Skada går inte att åtgärda
                </option>
                <option value="2" selected={product?.aestheticCondition === 2}>
                  Skada svår att åtgärda
                </option>
                <option value="3" selected={product?.aestheticCondition === 3}>
                  Skada kan lagas av proffs
                </option>
                <option value="4" selected={product?.aestheticCondition === 4}>
                  Skada kan lagas av lekman
                </option>
                <option value="5" selected={product?.aestheticCondition === 5}>
                  Perfekt skick
                </option>
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[412px]">
              <label
                htmlFor="functionalCondition"
                className="paragraph-bold flex gap-2"
              >
                Funktionellt skick
                <Image
                  src={`/${
                    product?.functionalCondition !== undefined &&
                    product?.functionalCondition !== null
                      ? product.functionalCondition
                      : 0
                  }-star.png`}
                  alt="Ej bedömd"
                  width={80}
                  height={16}
                />
              </label>
              <select className="inputField w-full">
                <option value="0" selected={product?.functionalCondition === 0}>
                  Ej bedömd
                </option>
                <option value="1" selected={product?.functionalCondition === 1}>
                  Skada går inte att åtgärda
                </option>
                <option value="2" selected={product?.functionalCondition === 2}>
                  Skada svår att åtgärda
                </option>
                <option value="3" selected={product?.functionalCondition === 3}>
                  Skada kan lagas av proffs
                </option>
                <option value="4" selected={product?.functionalCondition === 4}>
                  Skada kan lagas av lekman
                </option>
                <option value="5" selected={product?.functionalCondition === 5}>
                  Perfekt skick
                </option>
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
              <div className="inputField cursor-pointer !h-[92px] flex items-center justify-center gap-2">
                <Image src="/upload.svg" width={24} height={24} alt="upload" />
                Dra och släpp bilder här eller bläddra
              </div>
              <input type="file" className="hidden" />
            </div>
            <div className="flex flex-col gap-2 w-[412px]">
              <label htmlFor="internalId" className="paragraph-bold">
                Eget ID-nummer
              </label>
              <input
                className="inputField w-full"
                placeholder="Eget ID-nummer"
              />
            </div>
          </div>
          {/* --- Product image  */}

          {/* Product descripton --- */}
          <div className="flex gap-5 pb-10">
            <div className="flex flex-col gap-2 w-[412px]">
              <label htmlFor="description" className="paragraph-bold">
                Produktbeskrivning
              </label>
              <textarea className="inputField w-full min-h-[128px]" />
            </div>
          </div>
          {/* --- Product descripton */}
        </div>

        {/* location status amount: */}
        <div className="flex flex-row justify-between pb-9">
          <h1 className="header1-bold">Plats / Status / Antal</h1>
          <div className="flex gap-4">
            <button
              type="button"
              className="button-outline uppercase !font-bold"
            >
              Lägg till ny
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                className="button-outline !bg-lightGray !text-darkGray !border-lightGray"
              >
                Radera
              </button>
              <button
                type="button"
                className="button-outline !bg-lightGray !text-darkGray !border-lightGray"
              >
                Ändra
              </button>
              <button
                type="button"
                className="button-outline !bg-lightGray !text-darkGray !border-lightGray"
              >
                Kommentarer
              </button>
              <button
                type="button"
                className="button-outline !bg-lightGray !text-darkGray !border-lightGray"
              >
                Öppna planritning
              </button>
            </div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th className="paragraph-bold text-left">Ändra</th>
              <th className="paragraph-bold text-left">Antal (st)</th>
              <th className="paragraph-bold col-span-2 text-left">Status</th>
              <th className="paragraph-bold col-span-2">Marknadsplatsen</th>
              <th className="paragraph-bold text-left">Placering #1</th>
              <th className="paragraph-bold text-left">Placering #2</th>
              <th className="paragraph-bold text-left">Placering #3</th>
              <th className="paragraph-bold text-left">Placering #4</th>
              <th className="paragraph-bold text-left">QR-kod</th>
            </tr>
          </thead>

          {product?.ProductVariant.map((item, index) => (
            <tbody key={item.id}>
              <tr>
                <td>
                  <input type="checkbox" />
                </td>
                <td
                  onClick={() => toggleDropdown(index)}
                  className="cursor-pointer"
                >
                  <Image
                    src="/Button-Edit.svg"
                    alt="edit icon"
                    height={36}
                    width={36}
                  />
                </td>
                <td>
                  {/* antal */}
                  <input
                    type="text"
                    placeholder="1"
                    className="inputField"
                    value={product.ProductVariant[index].amount || 1}
                  />
                </td>
                <td>
                  <select className="inputField">
                    <option value="">Inventerad</option>
                  </select>
                </td>
                <td>
                  <select className="inputField">
                    <option value="">Ej publicerad</option>
                  </select>
                </td>
                <td className="paragraph text-left"></td>
                <td className="paragraph text-left"></td>
                <td className="paragraph text-left"></td>
                <td className="paragraph text-left"></td>
                <td></td>
              </tr>

              {/* dropdown part: */}
              <tr>
                <td colSpan={10}>
                  <div
                    className={` flex-col gap-4 mb-4 ${
                      dropdownIsVisible[index] ? "flex" : "hidden"
                    }`}
                  >
                    <h1 className="header1-bold">
                      Editera antal, status och platsinformation
                    </h1>

                    <LabelWrapper labelText="Antal (st)">
                      <input
                        className="inputField"
                        value={product.ProductVariant[index].amount || 1}
                      />
                    </LabelWrapper>

                    <div className="grid grid-cols-2 gap-6">
                      <LabelWrapper labelText="Status">
                        <select
                          className="inputField"
                          value={
                            product.ProductVariant[index].status || "Inventerad"
                          }
                        >
                          <option value="Inventerad">
                            Inventerad - i lager/förråd
                          </option>
                        </select>
                      </LabelWrapper>
                      <LabelWrapper labelText="Marknadsplatsen">
                        <select
                          className="inputField"
                          value={
                            product.ProductVariant[index].marketPlace ||
                            "Ej publicerad"
                          }
                        >
                          <option value="Ej publicerad">Ej publicerad</option>
                        </select>
                      </LabelWrapper>
                      <LabelWrapper labelText="Datum tillgänglig">
                        <input
                          className="inputField"
                          type="date"
                          value={"2024-09-27"}
                        />
                      </LabelWrapper>
                      <LabelWrapper labelText="Datum första möjliga leverans">
                        <input
                          className="inputField"
                          type="date"
                          value={"2024-09-27"}
                        />
                      </LabelWrapper>
                      <LabelWrapper labelText="Demonterbarhet">
                        <select
                          className="inputField"
                          value={
                            product.ProductVariant[index].demountability ||
                            "Enkel att demontera"
                          }
                        >
                          <option value="Enkel att demontera">
                            Enkel att demontera/demontering krävs ej
                          </option>
                        </select>
                      </LabelWrapper>
                      <LabelWrapper labelText="Åtkomlighet">
                        <select
                          className="inputField"
                          value={
                            product.ProductVariant[index].accessability ||
                            "Lätt åtkomligt"
                          }
                        >
                          <option value="Lätt åtkomligt">Lätt åtkomligt</option>
                        </select>
                      </LabelWrapper>
                      <LabelWrapper labelText="Demonterbarhet kommentar">
                        <input
                          className="inputField"
                          placeholder="Demonterbarhet kommentar"
                          value={
                            product.ProductVariant[index]
                              .demountabilityComment ||
                            "Demonterbarhet kommentar"
                          }
                        />
                      </LabelWrapper>
                      <LabelWrapper labelText="Åtkomlighet kommentar">
                        <input
                          className="inputField"
                          placeholder="Åtkomlighet kommentar"
                          value={
                            product.ProductVariant[index]
                              .accessabilityComment || "Åtkomlighet kommentar"
                          }
                        />
                      </LabelWrapper>
                    </div>

                    <div className="flex gap-5">
                      <LabelWrapper labelText="Placering #1">
                        <input
                          className="inputField"
                          placeholder="Placering #1"
                          value={
                            product.ProductVariant[index].location1 ||
                            "Placering 1"
                          }
                        />
                      </LabelWrapper>
                      <LabelWrapper labelText="Placering #2">
                        <Image
                          src="/Button-Add.svg"
                          height={36}
                          width={36}
                          alt="add button"
                        />
                      </LabelWrapper>
                    </div>

                    <div className="flex gap-5">
                      <LabelWrapper labelText="Beslutsbenämning #1">
                        <input
                          className="inputField"
                          placeholder="Beslutsbenämning #1"
                          value={
                            product.ProductVariant[index]
                              .decisionDesignation1 || "Beslutsbenämning 1"
                          }
                        />
                      </LabelWrapper>
                      <LabelWrapper labelText="Beslutsbenämning #2">
                        <Image
                          src="/Button-Add.svg"
                          height={36}
                          width={36}
                          alt="add button"
                        />
                      </LabelWrapper>
                    </div>

                    <div className="flex gap-5">
                      <button
                        className="button-outline !text-textBlack !border-textBlack"
                        onClick={() => toggleDropdown(index)}
                        type="button"
                      >
                        Stäng
                      </button>
                      <button
                        className="button-outline !text-textBlack !border-textBlack"
                        onClick={() => toggleDropdown(index)}
                        type="button"
                      >
                        Spara
                      </button>
                    </div>

                    <div className="w-full h-[1px] bg-lightGray my-4"></div>
                  </div>
                </td>
              </tr>
              {/* end of dropdown part */}
            </tbody>
          ))}
        </table>
        {/* end - location status amount: */}

        <section className="flex flex-col gap-8 pt-10">
          {/* Egenskaper: */}
          <div className="flex flex-col gap-4">
            <h1 className="header1-bold">Egenskaper</h1>

            <div className="flex gap-4">
              {/* hinge */}
              {selectedCategory !== "Golv" && (
                <div className="flex flex-col gap-2 w-[170px]">
                  <label htmlFor="hinge" className="paragraph-bold">
                    Hängning
                  </label>
                  <select className="inputField">
                    <option value="" selected={true}>
                      {product?.hinge}
                    </option>
                  </select>
                </div>
              )}

              {/* noiseReduction */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="noiseReduction" className="paragraph-bold">
                  Ljudreduktion (dB)
                </label>
                <select className="inputField">
                  <option value="" selected={true}>
                    {product?.noiseReduction}
                  </option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              {/* securityGrade */}
              {selectedCategory !== "Golv" && (
                <div className="flex flex-col gap-2 w-[170px]">
                  <label htmlFor="securityGrade" className="paragraph-bold">
                    Inbrottsskydd
                  </label>
                  <select className="inputField">
                    <option value="" selected={true}>
                      {product?.securityGrade}
                    </option>
                  </select>
                </div>
              )}

              {/* fireGrade */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="fireGrade" className="paragraph-bold">
                  Brandskydd
                </label>
                <select className="inputField">
                  <option value="" selected={true}>
                    {product?.fireGrade}
                  </option>
                </select>
              </div>
            </div>

            {/* glass: */}
            {selectedCategory !== "Golv" && (
              <div className="flex gap-4">
                {/* glassModel */}
                <div className="flex flex-col gap-2 w-[170px]">
                  <label htmlFor="glassModel" className="paragraph-bold">
                    Glasmodell
                  </label>
                  <select className="inputField">
                    <option value="" selected={true}>
                      {product?.glassModel}
                    </option>
                  </select>
                </div>

                {/* glassType */}
                <div className="flex flex-col gap-2 w-[170px]">
                  <label htmlFor="glassType" className="paragraph-bold">
                    Glastyp
                  </label>
                  <select className="inputField">
                    <option value="" selected={true}>
                      {product?.glassType}
                    </option>
                  </select>
                </div>

                {/* glassThickness */}
                <div className="flex flex-col gap-2 w-[170px]">
                  <label htmlFor="glassThickness" className="paragraph-bold">
                    Glastjocklek (mm)
                  </label>
                  <select className="inputField">
                    <option value="" selected={true}>
                      {product?.glassThickness}
                    </option>
                  </select>
                </div>
              </div>
            )}

            {selectedCategory !== "Golv" && (
              <div className="flex gap-4">
                {/* moduleMeasurements */}
                <div className="flex flex-col gap-2 w-[170px]">
                  <label
                    htmlFor="moduleMeasurements"
                    className="paragraph-bold"
                  >
                    Modulmått
                  </label>
                  <select className="inputField">
                    <option value="" selected={true}>
                      {product?.moduleMeasurements}
                    </option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {/* climate */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="climate" className="paragraph-bold">
                  Omgivning/klimat
                </label>
                <select className="inputField">
                  <option value="" selected={true}>
                    {product?.climate}
                  </option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              {/* color */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="color" className="paragraph-bold">
                  Färg
                </label>
                <input
                  className="inputField"
                  placeholder="Färg"
                  value={product?.color || "Färg"}
                />
              </div>
            </div>

            {selectedCategory !== "Golv" && (
              <div className="flex gap-4">
                {/* frameThickness */}
                <div className="flex flex-col gap-2 w-[170px]">
                  <label htmlFor="frameThickness" className="paragraph-bold">
                    Karmdjup (mm)
                  </label>
                  <input
                    value={product?.frameThickness || "Karmdjup (mm)"}
                    className="inputField"
                    placeholder="Karmdjup (mm)"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Form: */}
          <div className="flex flex-col gap-4">
            <h1 className="header1-bold">Form</h1>

            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="material" className="paragraph-bold">
                  Material
                </label>
                <input
                  className="inputField"
                  placeholder="Material"
                  value={product?.material || "Material"}
                />
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="finish" className="paragraph-bold">
                  Färg / Finish
                </label>
                <input
                  className="inputField"
                  placeholder="Färg / Finish"
                  value={product?.finish || "Färg / Finish"}
                />
              </div>
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="unitOfMeasurement" className="paragraph-bold">
                  Enhet mått
                </label>
                <select className="inputField w-24">
                  <option value="millimeters">mm</option>
                  <option value="centimeters">cm</option>
                  <option value="meters">m</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="width" className="paragraph-bold">
                  Bredd
                </label>
                <input
                  type="number"
                  className="inputField w-24"
                  placeholder="Bredd"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="length" className="paragraph-bold">
                  Längd
                </label>
                <input
                  type="number"
                  className="inputField w-24"
                  placeholder="Längd"
                  value={product?.length || ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="height" className="paragraph-bold">
                  Höjd
                </label>
                <input
                  type="number"
                  className="inputField w-24"
                  placeholder="Höjd"
                  value={product?.height || ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="depth" className="paragraph-bold">
                  Djup
                </label>
                <input
                  type="number"
                  className="inputField w-24"
                  placeholder="Djup"
                  value={product?.depth || ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="diameter" className="paragraph-bold">
                  Diameter
                </label>
                <input
                  type="number"
                  className="inputField w-24"
                  placeholder="Diameter"
                  value={product?.diameter || ""}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="thickness" className="paragraph-bold">
                  Tjocklek
                </label>
                <input
                  type="number"
                  className="inputField w-24"
                  placeholder="Tjocklek"
                  value={product?.thickness || ""}
                />
              </div>
            </div>

            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="unitOfWeight" className="paragraph-bold">
                  Enhet vikt
                </label>
                <select className="inputField">
                  <option value="grams">g</option>
                  <option value="kilograms">kg</option>
                  <option value="tonnes">ton</option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="weight" className="paragraph-bold">
                  Vikt / st
                </label>
                <input
                  className="inputField"
                  placeholder="Vikt / st"
                  type="number"
                  value={product?.weight || ""}
                />
              </div>
            </div>
          </div>

          {/* Produktinformation: */}
          <div className="flex flex-col gap-4">
            <h1 className="header1-bold">Produktinformation</h1>

            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="GTIN" className="paragraph-bold">
                  GTIN
                </label>
                <input
                  className="inputField"
                  placeholder="Ange GTIN om det finns/är känt"
                  value={product?.GTIN || ""}
                />
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="eNR" className="paragraph-bold">
                  E - NR
                </label>
                <input
                  className="inputField"
                  placeholder="Ange E - NR om det finns/är känt"
                  value={product?.eNR || ""}
                />
              </div>
            </div>

            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="RSK" className="paragraph-bold">
                  RSK
                </label>
                <input
                  className="inputField"
                  placeholder="Ange RSK om det finns/är känt"
                  value={product?.RSK || ""}
                />
              </div>

              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="Bk04" className="paragraph-bold">
                  Bk04
                </label>
                <input
                  className="inputField"
                  placeholder="Ange Bk04 om det finns/är känt"
                  value={product?.Bk04 || ""}
                />
              </div>
            </div>

            <div className="flex w-full justify-between gap-4">
              <div className="flex flex-col gap-2 w-1/2">
                <label htmlFor="BSAB" className="paragraph-bold">
                  BSAB
                </label>
                <input
                  className="inputField"
                  placeholder="Ange BSAB om det finns/är känt"
                  value={product?.BSAB || ""}
                />
              </div>

              <div className="flex flex-col gap-2 w-1/2 opacity-0">
                <label className="paragraph-bold">ghost field</label>
                <input
                  className="inputField"
                  placeholder="ghost field"
                  disabled
                />
              </div>
            </div>
          </div>

          {/* files: */}
          <div className="flex gap-8 items-center pb-10">
            <p className="paragraph-bold">Filer</p>
            <Image
              src="/Button-Add.svg"
              height={32}
              width={32}
              alt="plus icon"
            />
          </div>

          {/* Page navigation + submit: */}
        </section>
        <div className=" flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <h1 className="header1-bold">Hantering för marknadsplats</h1>
            <p className="text-red">Alla priser ska anges exklusive moms*</p>
          </div>
          <LabelWrapper labelText="Nypris / st">
            <input
              type="number"
              className="inputField w-[180px]"
              placeholder="Nypris / st"
              value={product?.originalPrice || ""}
            />
          </LabelWrapper>
          <div className="flex flex-row items-end gap-4">
            <LabelWrapper labelText="Externt pris / st">
              <input
                type="number"
                className="inputField w-[300px]"
                placeholder="Externt pris / st"
                value={product?.externalPrice || ""}
              />
            </LabelWrapper>

            <LabelWrapper labelText="Internt pris / st">
              <input
                type="number"
                className="inputField w-[300px]"
                placeholder="Internt pris / st"
                value={product?.internalPrice || ""}
              />
            </LabelWrapper>
            <div className=" flex gap-2 mb-2">
              <input type="checkbox" />
              <label className="paragraph-bold">Låt köparen föreslå pris</label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 pt-8">
          <h1 className="header2 font-bold">(Frakt Information)</h1>
          <div className="inline-flex items-center gap-2">
            <input type="checkbox" />
            <label className="paragraph-bold">Kan hämtas på plats</label>
          </div>
          <div className="flex flex-row gap-4">
            <LabelWrapper labelText="Address">
              <input
                className="inputField w-[300px]"
                placeholder="Upphämtningsadress"
                value={product?.adress || "Upphämtningsadress"}
              />
            </LabelWrapper>
            <LabelWrapper labelText="Postkod">
              <input
                className="inputField w-[300px]"
                placeholder="Postkod för upphämtning"
                value={product?.postalCode || "Postkod för Upphämtning"}
              />
            </LabelWrapper>
            <LabelWrapper labelText="Postort">
              <input
                className="inputField w-[300px]"
                placeholder="Ort för upphämtning"
                value={product?.city || "Ort för upphämtning"}
              />
            </LabelWrapper>
          </div>
          <div className="inline-flex items-center gap-2">
            <input type="checkbox" />
            <label className="paragraph-bold">Kan skickas med frakt</label>
          </div>
          <LabelWrapper labelText="Kommentar">
            <textarea
              className="inputField !h-14"
              placeholder="Ange kompletterande info om prissättningen och eventuella garantier, tex om kostnader tillkommer för demontering och frakt, samt 
          möjliga betalningsmetoder såsom faktura eller andra betalsätt."
              value={
                product?.comment ||
                "Ange kompletterande info om prissättningen och eventuella garantier, tex om kostnader tillkommer för demontering och frakt, samt möjliga betalningsmetoder såsom faktura eller andra betalsätt."
              }
            />
          </LabelWrapper>
          <LabelWrapper labelText="Kontaktperson">
            <input
              className="inputField w-[25rem]"
              placeholder="Marie Kalmnäs"
              value={product?.contactPerson || "Marie Kalmnäs"}
            />
          </LabelWrapper>
        </div>
        <div className="flex flex-row justify-between pt-[3.38rem]">
          <Link href={"/"} className="button-outline">
            Spara
          </Link>

          <Image
            src="/Button-Arrow-Up.svg"
            alt="up"
            height={36}
            width={36}
            className="cursor-pointer"
            onClick={scrollToTop}
          />
        </div>
      </form>
      <Footer />
    </>
  );
}

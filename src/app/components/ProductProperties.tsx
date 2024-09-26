"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FormPageProps } from "@/utils/types";
import buttonAdd from "/public/Button-Add.svg";
import checkmarkGreen from "/public/Checkmark-green.svg";

export default function ProductProperties({
  register,
  setViewState,
  getValues,
}: FormPageProps) {
  const [file, setFile] = useState("");
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // display a file name if one is set
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const f = event.target.files[0];
      setFile(f.name);
    }
  };

  const handleClick = () => {
    hiddenFileInput.current?.click();
  };

  // Get the selected category:
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    if (getValues) {
      const category = getValues("category");
      setSelectedCategory(category);
    }
  }, []);

  return (
    <>
      <section className="flex flex-col gap-8">
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
                <select {...register("hinge")} className="inputField">
                  <option value="Ej angivet" selected={true}>
                    Ej angivet
                  </option>
                </select>
              </div>
            )}

            {/* noiseReduction */}
            <div className="flex flex-col gap-2 w-[170px]">
              <label htmlFor="noiseReduction" className="paragraph-bold">
                Ljudreduktion (dB)
              </label>
              <select {...register("noiseReduction")} className="inputField">
                <option value="Ej angivet" selected={true}>
                  Ej angivet
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
                <select {...register("securityGrade")} className="inputField">
                  <option value="Ej angivet" selected={true}>
                    Ej angivet
                  </option>
                </select>
              </div>
            )}

            {/* fireGrade */}
            <div className="flex flex-col gap-2 w-[170px]">
              <label htmlFor="fireGrade" className="paragraph-bold">
                Brandskydd
              </label>
              <select {...register("fireGrade")} className="inputField">
                <option value="Ej angivet" selected={true}>
                  Ej angivet
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
                <select {...register("glassModel")} className="inputField">
                  <option value="Ej angivet" selected={true}>
                    Ej angivet
                  </option>
                </select>
              </div>

              {/* glassType */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="glassType" className="paragraph-bold">
                  Glastyp
                </label>
                <select {...register("glassType")} className="inputField">
                  <option value="Ej angivet" selected={true}>
                    Ej angivet
                  </option>
                </select>
              </div>

              {/* glassThickness */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="glassThickness" className="paragraph-bold">
                  Glastjocklek (mm)
                </label>
                <select {...register("glassThickness")} className="inputField">
                  <option value="Ej angivet" selected={true}>
                    Ej angivet
                  </option>
                </select>
              </div>
            </div>
          )}

          {selectedCategory !== "Golv" && (
            <div className="flex gap-4">
              {/* moduleMeasurements */}
              <div className="flex flex-col gap-2 w-[170px]">
                <label htmlFor="moduleMeasurements" className="paragraph-bold">
                  Modulmått
                </label>
                <select
                  {...register("moduleMeasurements")}
                  className="inputField"
                >
                  <option value="Ej angivet" selected={true}>
                    Ej angivet
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
              <select {...register("climate")} className="inputField">
                <option value="Ej angivet" selected={true}>
                  Ej angivet
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
                {...register("color")}
                className="inputField"
                placeholder="Färg"
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
                  {...register("frameThickness")}
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

          {/* Material och finish */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-[300px]">
              <label htmlFor="material" className="paragraph-bold">
                Material
              </label>
              <input
                {...register("material")}
                className="inputField"
                placeholder="Material"
              />
            </div>

            <div className="flex flex-col gap-2  w-[300px]">
              <label htmlFor="finish" className="paragraph-bold">
                Färg / Finish
              </label>
              <input
                {...register("finish")}
                className="inputField"
                placeholder="Färg / Finish"
              />
            </div>
          </div>
          {/* end - Material och finish */}

          {/* Unit of measurement + dimensions */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="unitOfMeasurement" className="paragraph-bold">
                Enhet mått
              </label>
              <select
                {...register("unitOfMeasurement")}
                className="inputField w-24"
              >
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
                {...register("width", { valueAsNumber: true })}
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
                {...register("length", { valueAsNumber: true })}
                type="number"
                className="inputField w-24"
                placeholder="Längd"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="height" className="paragraph-bold">
                Höjd
              </label>
              <input
                {...register("height", { valueAsNumber: true })}
                type="number"
                className="inputField w-24"
                placeholder="Höjd"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="depth" className="paragraph-bold">
                Djup
              </label>
              <input
                {...register("depth", { valueAsNumber: true })}
                type="number"
                className="inputField w-24"
                placeholder="Djup"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="diameter" className="paragraph-bold">
                Diameter
              </label>
              <input
                {...register("diameter", { valueAsNumber: true })}
                type="number"
                className="inputField w-24"
                placeholder="Diameter"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="thickness" className="paragraph-bold">
                Tjocklek
              </label>
              <input
                {...register("thickness", { valueAsNumber: true })}
                type="number"
                className="inputField w-24"
                placeholder="Tjocklek"
              />
            </div>
          </div>
          {/* end - Unit of measurement + dimensions */}

          {/* Unit of weight + weight */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 w-[300px]">
              <label htmlFor="unitOfWeight" className="paragraph-bold">
                Enhet vikt
              </label>
              <select {...register("unitOfWeight")} className="inputField">
                <option value="grams">g</option>
                <option value="kilograms">kg</option>
                <option value="tonnes">ton</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 w-[300px]">
              <label htmlFor="weight" className="paragraph-bold">
                Vikt / st
              </label>
              <input
                {...register("weight", { valueAsNumber: true })}
                className="inputField"
                placeholder="Vikt / st"
                type="number"
              />
            </div>
          </div>
          {/* end - Unit of weight + weight */}
        </div>

        {/* Produktinformation: */}
        <div className="flex flex-col gap-4">
          <h1 className="header1-bold">Produktinformation</h1>

          <div className="flex w-full  gap-4">
            <div className="flex flex-col gap-2 w-[400px]">
              <label htmlFor="GTIN" className="paragraph-bold">
                GTIN
              </label>
              <input
                {...register("GTIN")}
                className="inputField"
                placeholder="Ange GTIN om det finns/är känt"
              />
            </div>

            <div className="flex flex-col gap-2 w-[400px]">
              <label htmlFor="eNR" className="paragraph-bold">
                E - NR
              </label>
              <input
                {...register("eNR")}
                className="inputField"
                placeholder="Ange E - NR om det finns/är känt"
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2 w-[400px]">
              <label htmlFor="RSK" className="paragraph-bold">
                RSK
              </label>
              <input
                {...register("RSK")}
                className="inputField"
                placeholder="Ange RSK om det finns/är känt"
              />
            </div>

            <div className="flex flex-col gap-2 w-[400px]">
              <label htmlFor="Bk04" className="paragraph-bold">
                Bk04
              </label>
              <input
                {...register("Bk04")}
                className="inputField"
                placeholder="Ange Bk04 om det finns/är känt"
              />
            </div>
          </div>

          <div className="flex w-full gap-4">
            <div className="flex flex-col gap-2 w-[400px]">
              <label htmlFor="BSAB" className="paragraph-bold">
                BSAB
              </label>
              <input
                {...register("BSAB")}
                className="inputField"
                placeholder="Ange BSAB om det finns/är känt"
              />
            </div>

            <div className="flex flex-col gap-2 w-[400px] opacity-0">
              <label className="paragraph-bold">ghost field</label>
              <input
                className="inputField"
                placeholder="ghost field"
                disabled
              />
            </div>
          </div>
        </div>
        {/* end - Produktinformation: */}

        {/* files: */}
        <div className="flex gap-8 items-center">
          <p className="paragraph-bold">Filer</p>
          <Image src={buttonAdd} alt="plus icon" onClick={handleClick} />

          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {file !== "" ? (
          <div className="flex gap-2">
            <Image src={checkmarkGreen} alt="green checkmark" />
            <p className="paragraph">{file}</p>
          </div>
        ) : null}
        {/* end - files: */}

        {/* Page navigation + submit: */}
        <div className="flex gap-6 w-full justify-between">
          <div className="flex gap-6">
            <button
              onClick={() => setViewState("LocationStatusAmount")}
              className="button-outline"
            >
              Föregående
            </button>
            <button
              onClick={() => setViewState("Marketplace")}
              className="button-fill"
            >
              Nästa
            </button>
          </div>
          <button type="submit" className="button-outline">
            Spara
          </button>
        </div>
      </section>
    </>
  );
}

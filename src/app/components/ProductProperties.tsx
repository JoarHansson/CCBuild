"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { FormPageProps } from "@/utils/types";
import buttonAdd from "/public/Button-Add.svg";
import checkmarkGreen from "/public/Checkmark-green.svg";

export default function ProductProperties({
  register,
  setViewState,
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

  return (
    <>
      <section className="flex flex-col gap-8">
        {/* Egenskaper: */}
        <div className="flex flex-col gap-4">
          <h1 className="header1-bold">Egenskaper</h1>
          <p className="paragraph">
            Det finns inga specifika egenskaper för vald produkttyp
          </p>
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
                {...register("material")}
                className="inputField"
                placeholder="Material"
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
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

          <div className="flex w-full gap-4">
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

          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="unitOfWeight" className="paragraph-bold">
                Enhet vikt
              </label>
              <select {...register("unitOfWeight")} className="inputField">
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
                {...register("weight", { valueAsNumber: true })}
                className="inputField"
                placeholder="Vikt / st"
                type="number"
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
                {...register("GTIN")}
                className="inputField"
                placeholder="Ange GTIN om det finns/är känt"
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
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

          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="RSK" className="paragraph-bold">
                RSK
              </label>
              <input
                {...register("RSK")}
                className="inputField"
                placeholder="Ange RSK om det finns/är känt"
              />
            </div>

            <div className="flex flex-col gap-2 w-1/2">
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

          <div className="flex w-full justify-between gap-4">
            <div className="flex flex-col gap-2 w-1/2">
              <label htmlFor="BSAB" className="paragraph-bold">
                BSAB
              </label>
              <input
                {...register("BSAB")}
                className="inputField"
                placeholder="Ange BSAB om det finns/är känt"
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

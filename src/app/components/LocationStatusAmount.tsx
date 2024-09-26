"use client";

import { FormPageProps } from "@/utils/types";
import Image from "next/image";
import { useFieldArray } from "react-hook-form";

import { LabelWrapper } from "./LabelWrapper";
import { useEffect, useState } from "react";

export default function LocationStatusAmount({
  register,
  setViewState,
  control,
  getValues,
}: FormPageProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ProductVariant",
  });

  const defaultVariant = {
    id: null,
    amount: null,
    status: "",
    marketPlace: "",
    dateAvailable: null,
    earliestDeliveryDate: null,
    demountability: "",
    demountabilityComment: "",
    accessability: "",
    accessabilityComment: "",
    location1: "",
    location2: "",
    location3: "",
    location4: "",
    decisionDesignation1: "",
    decisionDesignation2: "",
    decisionDesignation3: "",
    decisionDesignation4: "",
    qrCodeUrl: "",
  };

  useEffect(() => {
    append(defaultVariant);
  }, []);

  const getTodaysDate = () => {
    // Format the date as YYYY-MM-DD
    const today = new Date().toISOString().split("T")[0];
    return today;
  };

  const [dropdownIsVisible, setDropdownIsVisible] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDropdown = (index: number) => {
    setDropdownIsVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="header1-bold">Plats / Status / Antal</h1>
        <div className="flex gap-4">
          <button
            type="button"
            className="button-outline uppercase !font-bold"
            onClick={() => append(defaultVariant)}
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

        {fields.map((item, index) => (
          <tbody>
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
                  value={getValues?.(`ProductVariant.${index}.amount`) || ""}
                  defaultValue={1}
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
                  className={`flex-col gap-4 mb-4 ${
                    dropdownIsVisible[index] ? "flex" : "hidden"
                  }`}
                >
                  <h1 className="header1-bold">
                    Editera antal, status och platsinformation
                  </h1>

                  <LabelWrapper labelText="Antal (st)">
                    <input
                      {...register(`ProductVariant.${index}.amount`, {
                        valueAsNumber: true,
                      })}
                      className="inputField"
                    />
                  </LabelWrapper>

                  <div className="grid grid-cols-2 gap-6">
                    <LabelWrapper labelText="Status">
                      <select
                        {...register(`ProductVariant.${index}.status`)}
                        className="inputField"
                      >
                        <option value="Inventerad">
                          Inventerad - i lager/förråd
                        </option>
                      </select>
                    </LabelWrapper>
                    <LabelWrapper labelText="Marknadsplatsen">
                      <select
                        {...register(`ProductVariant.${index}.marketPlace`)}
                        className="inputField"
                      >
                        <option value="Ej publicerad">Ej publicerad</option>
                      </select>
                    </LabelWrapper>
                    <LabelWrapper labelText="Datum tillgänglig">
                      <input
                        {...register(`ProductVariant.${index}.dateAvailable`, {
                          valueAsDate: true,
                        })}
                        className="inputField"
                        type="date"
                        defaultValue={getTodaysDate()}
                      />
                    </LabelWrapper>
                    <LabelWrapper labelText="Datum första möjliga leverans">
                      <input
                        {...register(
                          `ProductVariant.${index}.earliestDeliveryDate`,
                          {
                            valueAsDate: true,
                          }
                        )}
                        className="inputField"
                        type="date"
                        defaultValue={getTodaysDate()}
                      />
                    </LabelWrapper>
                    <LabelWrapper labelText="Demonterbarhet">
                      <select
                        {...register(`ProductVariant.${index}.demountability`)}
                        className="inputField"
                      >
                        <option value="Enkel att demontera">
                          Enkel att demontera/demontering krävs ej
                        </option>
                      </select>
                    </LabelWrapper>
                    <LabelWrapper labelText="Åtkomlighet">
                      <select
                        {...register(`ProductVariant.${index}.accessability`)}
                        className="inputField"
                      >
                        <option value="Lätt åtkomligt">Lätt åtkomligt</option>
                      </select>
                    </LabelWrapper>
                    <LabelWrapper labelText="Demonterbarhet kommentar">
                      <input
                        {...register(
                          `ProductVariant.${index}.demountabilityComment`
                        )}
                        className="inputField"
                        placeholder="Demonterbarhet kommentar"
                      />
                    </LabelWrapper>
                    <LabelWrapper labelText="Åtkomlighet kommentar">
                      <input
                        {...register(
                          `ProductVariant.${index}.accessabilityComment`
                        )}
                        className="inputField"
                        placeholder="Åtkomlighet kommentar"
                      />
                    </LabelWrapper>
                  </div>

                  <div className="flex gap-5">
                    <LabelWrapper labelText="Placering #1">
                      <input
                        {...register(`ProductVariant.${index}.location1`)}
                        className="inputField"
                        placeholder="Placering #1"
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
                        {...register(
                          `ProductVariant.${index}.decisionDesignation1`
                        )}
                        className="inputField"
                        placeholder="Beslutsbenämning #1"
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

            {/* <button type="button" onClick={() => remove(index)}>
              Delete
            </button> */}
          </tbody>
        ))}
      </table>

      <div className="flex gap-6 justify-between">
        <div>
          <button
            onClick={() => setViewState("GeneralInformation")}
            className="button-outline"
          >
            Föregående
          </button>
          <button
            onClick={() => setViewState("ProductProperties")}
            className="button-fill"
          >
            Nästa
          </button>
        </div>
        <button type="submit" className="button-outline">
          Spara
        </button>
      </div>
    </>
  );
}

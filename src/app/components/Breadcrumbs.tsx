"use client";
import Image from "next/image";
import { ViewState } from "@/utils/types";

export const Breadcrumbs = ({ viewState }: { viewState: ViewState }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row pb-[1.59rem]">
          <h1 className="header1">Översikt</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1">Projekt</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1">Grupp 4</h1>
          <Image src="/crumb-arrow.svg" alt="arrow" width={24} height={24} />
          <h1 className="header1-bold">Skapa ny produkt</h1>
        </div>
        {viewState === "GeneralInformation" && (
          <div className="flex flex-row gap-[0.81rem] pb-[1.47rem]">
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-bold">Generell information</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Plats / Status / Antal</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Egenskaper / Produktinformation</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Hantering för marknadsplats</h2>
          </div>
        )}
        {viewState === "LocationStatusAmount" && (
          <div className="flex flex-row gap-[0.81rem] pb-[1.47rem]">
            <Image
              src="/Checkmark-green.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Generell information</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-bold">Plats / Status / Antal</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Egenskaper / Produktinformation</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Hantering för marknadsplats</h2>
          </div>
        )}
        {viewState === "ProductProperties" && (
          <div className="flex flex-row gap-[0.81rem] pb-[1.47rem]">
            <Image
              src="/Checkmark-green.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Generell information</h2>
            <Image
              src="/Checkmark-green.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Plats / Status / Antal</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-bold">Egenskaper / Produktinformation</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Hantering för marknadsplats</h2>
          </div>
        )}
        {viewState === "Marketplace" && (
          <div className="flex flex-row gap-[0.81rem] pb-[1.47rem]">
            <Image
              src="/Checkmark-green.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Generell information</h2>
            <Image
              src="/Checkmark-green.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Plats / Status / Antal</h2>
            <Image
              src="/Checkmark-green.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-grey">Egenskaper / Produktinformation</h2>
            <Image
              src="/Checkmark-grey.svg"
              alt="grey checkmark"
              width={18}
              height={18}
            />
            <h2 className="navigation-bold">Hantering för marknadsplats</h2>
          </div>
        )}
        <div className="w-full h-[1px] bg-lightGray my-4 pb-[1.62]"></div>
      </div>
    </>
  );
};

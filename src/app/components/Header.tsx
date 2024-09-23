"use client";
import Image from "next/image";
export const Header = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-between pl-[8.88rem] pr-[9.38rem]">
        <Image src="/ccbuild-logo.png" width={180} height={101.21} alt="logo" />
        <div className="flex flex-row items-center gap-8">
          <p className="paragraph-bold">CCBUILD</p>
          <p className="paragraph-bold">TJÄNSTER</p>
          <div className="flex flex-row">
            <p className="paragraph-bold">MARKNADSPLATSEN</p>
            <Image
              src="dropdown-arrow.svg"
              width={16}
              height={16}
              alt="arrow"
            />
          </div>
          <div className="flex flex-row">
            <p className="paragraph-bold">PRODUKTBANKEN</p>
            <Image
              src="dropdown-arrow.svg"
              width={16}
              height={16}
              alt="arrow"
            />
          </div>
          <div className="flex flex-row bg-lightGray rounded-[3.125rem] p-[0.5rem_0.99938rem_0.53125rem_1rem]">
            <Image src="user-icon.svg" width={16} height={16} alt="user" />
            <p className="paragraph-bold">Marie Kalmnäs</p>
            <Image
              src="dropdown-arrow.svg"
              width={16}
              height={16}
              alt="arrow"
            />
          </div>
          <div className="flex flex-row bg-lightGray rounded-[3.125rem] p-[0.5rem_0.99938rem_0.53125rem_1rem]">
            <p className="paragraph-bold">SV</p>
            <Image
              src="dropdown-arrow.svg"
              width={16}
              height={16}
              alt="arrow"
            />
          </div>
        </div>
      </div>
      <div className="bg-darkBlue flex flex-row gap-7 items-center pl-[8.88rem] pr-[9.38rem] h-[3.53125rem]">
        <p className="paragraph-bold text-textWhite">ÖVERSIKT</p>
        <p className="paragraph-bold text-textWhite">PROJEKT</p>
        <p className="paragraph-bold text-textWhite">PRODUKTER</p>
        <p className="paragraph-bold text-textWhite">EFTERLYSNINGAR</p>
        <p className="paragraph-bold text-textWhite">ORGANISATIONSADMIN</p>
        <p className="paragraph-bold text-textWhite">VÄRDEANALYS</p>
        <p className="paragraph-bold text-textWhite">MÄRKNING</p>
        <p className="paragraph-bold text-textWhite">HJÄLP</p>
        <div className="flex flex-row w-[20rem] h-[2.45rem] py-[0.77125rem] pl-1 rounded-[0.125rem] bg-textWhite bg-opacity-10">
          <Image src="search-icon.svg" width={16} height={16} alt="search" />
          <p className="paragraph-skinny text-textWhite ">
            Sök produkter, kategorier..
          </p>
        </div>
      </div>
    </>
  );
};

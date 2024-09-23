"use client";
import Image from "next/image";
export const Footer = () => {
  return (
    <>
      <div className="bg-darkBlue text-textWhite flex flex-col content-center items-center py-20 bottom-0">
        <h1 className="header1-bold pb-[2.63rem]">
          CCBuild.se - Produktbanken
        </h1>
        <div className="flex flex-row underline font-light gap-4 pb-8">
          <p>Start</p>
          <p>Projekt</p>
          <p>Produkter</p>
          <p>Efterlysningar</p>
          <p>Organisationsadmin</p>
          <p>Värdeanalys</p>
          <p>Märkning</p>
          <p>Hjälp</p>
        </div>
        <h2 className="header2 pb-5">
          CCBuild har utvecklats med stöd från Vinnova – läs mer på{" "}
          <u>www.ccbuild.se</u>
        </h2>
        <div className="flex flex-row h-7 gap-4">
          <h2 className="header2">Följ oss på sociala medier</h2>
          <Image
            src="fb-logo.svg"
            height={12.5}
            width={20}
            style={{ height: "12.5", width: "auto" }}
            alt="facebook"
          />
          <Image
            src="ig-logo.svg"
            height={17.5}
            width={20}
            style={{ height: "17.5", width: "auto" }}
            alt="instagram"
          />
          <Image
            src="linkedin-logo.svg"
            height={17.5}
            width={20}
            style={{ height: "17.5", width: "auto" }}
            alt="linkedin"
          />
          <Image
            src="yt-logo.svg"
            height={22.5}
            width={20}
            style={{ height: "22.5", width: "auto" }}
            alt="youtube"
          />
        </div>
      </div>
    </>
  );
};

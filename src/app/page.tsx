"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <p>HelloWorld</p>
      <Link href={"/AddProduct"}>Lägg till produkt</Link>
    </>
  );
}

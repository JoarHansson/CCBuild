"use client";

import Link from "next/link";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <p>HelloWorld</p>
      <Link href={"/AddProduct"}>Lägg till produkt</Link>
    </>
  );
}

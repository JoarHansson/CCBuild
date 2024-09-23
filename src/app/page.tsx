"use client";

import Link from "next/link";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <p>HelloWorld</p>
      <Link href={"/AddProduct"}>Lägg till produkt</Link>
      <Footer />
    </>
  );
}

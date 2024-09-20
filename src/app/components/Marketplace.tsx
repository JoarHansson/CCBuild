"use client";

import { UseFormRegister } from "react-hook-form";

import { Product } from "@/utils/types";

export default function Marketplace({
  register,
}: {
  register: UseFormRegister<Product>;
}) {
  console.log(register);

  return <></>;
}

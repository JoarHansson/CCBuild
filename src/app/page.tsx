"use client";

import Link from "next/link";

import { getProducts } from "@/utils/queries";
import { useEffect, useState } from "react";
import { Product } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const [products, setProducts] = useState<Product[]>();
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        console.log(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <Link href={"/AddProduct"}>Lägg till produkt</Link>
      <div>
        {products?.map((product) => {
          return (
            <div
              className="cursor-pointer"
              key={product.id}
              onClick={() => router.push(`/${product.id}`)}
            >
              <p className="paragraph">
                {`${product.category} > ${product.firstSubCategory} ${
                  product.secondSubCategory
                    ? `> ${product.secondSubCategory}`
                    : ""
                }`}
              </p>
              <h2 className="header2">{product.name}</h2>
              <p>CCbuild Nr. {product.id}</p>
              <div>
                Estetiskt skick
                {product.aestheticCondition === null ? (
                  <Image
                    src={`/0-star.png`}
                    alt="Ej bedömd"
                    width={80}
                    height={16}
                  />
                ) : (
                  <Image
                    src={`/${product.aestheticCondition}-star.png`}
                    alt="Ej bedömd"
                    width={80}
                    height={16}
                  />
                )}
              </div>
              <div>
                Funktionellt skick
                {product.functionalCondition === null ? (
                  <Image
                    src={`/0-star.png`}
                    alt="Ej bedömd"
                    width={80}
                    height={16}
                  />
                ) : (
                  <Image
                    src={`/${product.functionalCondition}-star.png`}
                    alt="Ej bedömd"
                    width={80}
                    height={16}
                  />
                )}
              </div>
              <div>Datum tillgänglig 2024-09-27</div>
              <div>
                Totalt antal
                {product.ProductVariant.reduce((accumulator, item) => {
                  if (item.amount === null) {
                    return (accumulator += 0);
                  } else {
                    return (accumulator += item.amount);
                  }
                }, 0)}
              </div>
              <div>Total klimatbesparing N/A</div>
              <div>Total mängd N/A</div>
              <br />
            </div>
          );
        })}
      </div>
    </>
  );
}

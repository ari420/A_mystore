"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer from "./footer/page";
import useProductStore from "./proStore/productStore";
import Image from "next/image";

type ShopItem = {
  id: string;
  name: string;
  price: number;
  imag: string;
  info: string;
  count: number;
  categories: string[]; // Add categories to product structure
};

export default function Home() {
  const [products, setProducts] = useState<ShopItem[]>([]);
  const searchQuery = useProductStore((state) => state.searchQuery);
  const filters = useProductStore((state) => state.filters);

  // Fetch product data on component mount
  useEffect(() => {
    async function getData() {
      try {
        const res = await fetch(
          "https://679ab1f5747b09cdcccf8305.mockapi.io/shop-ari-zas"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const data: ShopItem[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    getData();
  }, []);

  // Filter products by search query and active filters
  const filteredProducts = products.filter((product) => {
    let isValid = true;

    // Apply search query filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      isValid = false;
    }

    // Apply category filters dynamically
    for (const [key, value] of Object.entries(filters)) {
      if (value && !product.categories?.includes(key)) {
        // If filter is active and product categories don't include the filter key, invalidate
        isValid = false;
        break;
      }
    }

    return isValid;
  });

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 text-gray-900 dark:text-gray-100">
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((val: ShopItem) => {
              const productSlug = val.id;
              return (
                <div
                  key={val.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition"
                >
                  <Link href={`/products/${productSlug}`}>
                    <div className="block cursor-pointer dark:bg-slate-900 bg-slate-200 rounded-md  text-center text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400">
                      {val.name}
                    </div>
                  </Link>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Price: ${val.price}
                  </p>
                  <figure className=" w-full h-40">
                    <Image
                      src={val.imag as string}
                      alt={val.name as string}
                      className=" w-full h-full object-cover rounded-lg mt-4"
                      layout="reintrinsic"
                      height={800}
                      width={1200}
                    />
                  </figure>
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
                    {val.info}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
              No products match your filters.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}

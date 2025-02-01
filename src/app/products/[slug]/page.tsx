"use client";

import React, { useEffect, useState } from "react";
import useStore from "@/app/store/handelCart";
import Link from "next/link";
import Footer from "@/app/footer/page";
import Image from "next/image";

interface ProductData {
  id: string;
  name: string;
  price: number;
  imag: string;
  info: string;
  count: number;
}

const getProductData = async (slug: string): Promise<ProductData | null> => {
  try {
    const res = await fetch(
      `https://679ab1f5747b09cdcccf8305.mockapi.io/shop-ari-zas/${slug}`
    );
    if (!res.ok) throw new Error("Product not found");
    return res.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
};

export default function ProductDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { updateBasket } = useStore();
  const [data, setData] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);

  const resolvedParams = React.use(params);

  useEffect(() => {
    if (resolvedParams) {
      const { slug } = resolvedParams;

      const fetchData = async () => {
        setLoading(true);
        const productData = await getProductData(slug);
        setData(productData);
        setLoading(false);
      };

      fetchData();
    }
  }, [resolvedParams]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-6 dark:text-gray-100">
          Loading Product...
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          Please wait while we load the product details.
        </p>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-6">
          Product Not Found
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400 text-center max-w-md">
          Sorry the product you are looking for does not exist.
        </p>
        <Link href={"/"}>
          <button className="mt-4 px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500">
            Back to Previous Page
          </button>
        </Link>
      </main>
    );
  }

  const temp = {
    id: data.id,
    name: data.name,
    price: data.price,
    imag: data.imag,
    info: data.info,
    count: data.count,
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 flex flex-wrap *:w-full items-center justify-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <figure className=" w-full h-full">
            <Image
              src={data.imag as string}
              alt={data.name as string}
              className=" w-full h-full contrast-125 object-cover rounded-lg"
              layout="reintrinsic"
              height={800}
              width={1200}
            />
          </figure>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold dark:text-gray-100">{data.name}</h1>
          <div className=" flex flex-col justify-between h-full">
            <p className="text-lg dark:text-gray-400">{data.info}</p>
            <p className="text-xl font-bold dark:text-gray-100 ">
              Price: ${data.price}
            </p>
          </div>

          <div className="flex space-x-4 mt-4">
            <button
              className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500"
              onClick={() => updateBasket(temp)}
            >
              Add to Cart
            </button>
            <Link href={"/"}>
              <button className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
                Back to Previous Page
              </button>
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

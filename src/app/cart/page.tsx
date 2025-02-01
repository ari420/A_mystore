"use client";

import React from "react";
import useStore from "../store/handelCart";
import Link from "next/link";
import Footer from "../footer/page";
import Image from "next/image";

export default function Page() {
  const basket = useStore((state) => state.cart);
  const myPlus = useStore((state) => state.myPlus);
  const myMines = useStore((state) => state.myMines);
  const myDel = useStore((state) => state.myDel);
  const confirmDelete = useStore((state) => state.confirmDelete);
  const cancelDelete = useStore((state) => state.cancelDelete);
  const isDeleteModalOpen = useStore((state) => state.isDeleteModalOpen);
  const itemToDelete = useStore((state) => state.itemToDelete);
  const itemDetails = basket.find((item) => item.id === itemToDelete);
  const totalPrice = basket.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  return (
    <main className="p-6 min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <h1 className="text-4xl font-bold mb-6 text-center">Shopping Cart</h1>

      <div className="max-w-5xl mx-auto">
        {/* Show items in the basket */}
        <ul className="space-y-6">
          {basket.length > 0 ? (
            basket.map((item) => (
              <li
                key={item.id}
                className="p-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-md flex flex-col md:flex-row items-center justify-between gap-4"
              >
                {/* Product Image */}
                <figure className=" w-32 h-32">
                  <Image
                    src={item.imag as string}
                    alt={item.name as string}
                    className=" w-full h-full contrast-125 object-cover rounded-md"
                    layout="reintrinsic"
                    height={800}
                    width={1200}
                  />
                </figure>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="text-xl font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Price: ${item.price}
                  </div>
                  <div>Count: {item.count}</div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => myMines(item.id)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <button
                    onClick={() => myPlus(item.id)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => myDel(item.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-600 dark:text-gray-400">
              Cart is empty.
            </li>
          )}
        </ul>

        {/* Total Price */}
        {basket.length > 0 && (
          <div className="mt-6 text-xl font-semibold text-right">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href={"/"}>
            <button className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-500">
              Back To Store
            </button>
          </Link>
        </div>
      </div>

      <Footer />

      {/* Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="w-[400px] bg-white dark:bg-gray-800 p-6 rounded-md shadow-lg">
            <h2 className="text-lg font-bold mb-4 dark:text-gray-100">
              Do you want to delete this item from your cart?
            </h2>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              {itemDetails?.name || "Unknown item"}
            </p>
            <div className="flex justify-between">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

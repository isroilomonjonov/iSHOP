"use client";
import { ProductType } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import CustomImage from "./image";

const Product: FC<{ product: ProductType }> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="h-96 flex flex-col group bg-white p-6 rounded-lg shadow hover:scale-105 transition-transform ease-out duration-200">
      {/* <img
        className="h-40 rounded w-full object-cover object-center mb-6"
        src={product.image}
        alt="content"
      /> */}
      <div className="relative max-h-80 flex-1">
        <CustomImage product={product} fill/>
        {/* <Image src={product.image} alt={product.title} fill/> */}
      </div>
      <h3 className="tracking-widest mt-1 text-indigo-500 text-xs font-medium title-font">
        {product.category}
      </h3>
      <div className="font-semibold flex items-center justify-beetwen mt-4 mb-1">
        <p className="w-44 truncate">{product.title}</p>
        <p>${product.price}</p>
      </div>
      <p className="leading-relaxed text-base line-clamp-2">
        {product.description}
      </p>
    </Link>
  );
};

export default Product;

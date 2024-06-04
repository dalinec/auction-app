import { Item } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";
import React from "react";

const ItemCard = ({ item }: { item: Item }) => {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-slate-300 p-6 shadow-lg">
      <Image
        src={getImageUrl(item.fileKey)}
        alt={item.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full lg:h-[150px]"
      />
      <div className="flex flex-col">
        <span>{item.name}</span>
        <span>Starting price: {item.startingPrice / 100} €</span>
      </div>
    </div>
  );
};

export default ItemCard;

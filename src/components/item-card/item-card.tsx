import { Item } from "@/db/schema";
import { getImageUrl } from "@/utils/files";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatToDolars } from "@/utils/currency";

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
        <h2 className="text-xl font-bold">{item.name}</h2>
        <span>Current Bid: {formatToDolars(item.currentBid)} €</span>
        <span>Starting price: {formatToDolars(item.startingPrice)} €</span>
        <span>
          Total price:{" "}
          {parseInt(formatToDolars(item.startingPrice)) +
            parseInt(formatToDolars(item.currentBid))}
          €
        </span>
        <Button className="mt-5 w-full place-self-end md:max-w-fit" asChild>
          <Link href={`/items/${item.id}`}>Place Bid</Link>
        </Button>
      </div>
    </div>
  );
};

export default ItemCard;

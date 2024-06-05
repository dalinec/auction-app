import React from "react";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/utils/files";
import { formatDistance } from "date-fns";
import { formatToDolars } from "@/utils/currency";

const formatTimeStamp = (timestamp: Date) => {
  return formatDistance(timestamp, new Date(), {
    addSuffix: true,
  });
};

const ItemPage = async ({
  params: { itemId },
}: {
  params: { itemId: string };
}) => {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    return (
      <div className="mt-10 flex flex-col items-center space-y-8">
        <Image
          src={"/package.svg"}
          alt="404"
          sizes="100vw"
          width={0}
          height={0}
          className="h-full w-full max-w-[450px]"
        />
        <h1 className={cn("title")}>Item not found.</h1>
        <p className="text-center">
          The item you &apos;re trying to vies is invalid.
          <br /> Please go back and search for a different auction item.
        </p>
        <Button asChild>
          <Link href={"/"}>View Auctions</Link>
        </Button>
      </div>
    );
  }

  // const bids = [
  //   {
  //     id: 1,
  //     amount: 100,
  //     userName: "Alice",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 2,
  //     amount: 500,
  //     userName: "Dlice",
  //     timestamp: new Date(),
  //   },
  //   {
  //     id: 3,
  //     amount: 800,
  //     userName: "Flice",
  //     timestamp: new Date(),
  //   },
  // ];

  const bids = [];

  const hasBids = bids.length > 0;

  return (
    <main className="space-y-8">
      {/* container */}
      <div className="flex flex-col gap-12 md:flex-row">
        {/* left */}
        <div className="w-full space-y-12">
          <h1 className="text-4xl font-bold">
            <span className="font-normal">Auction for</span> {item.name}
          </h1>
          <Image
            src={getImageUrl(item.fileKey)}
            alt={item.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full rounded-xl md:max-w-[400px]"
          />
          <div className="space-y-4 text-xl">
            <div>
              Starting price of{" "}
              <span className="font-bold">
                ${formatToDolars(item.startingPrice)}
              </span>
            </div>
            <div>
              Bid Interval:{" "}
              <span className="font-bold">
                ${formatToDolars(item.bidInterval)}
              </span>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full space-y-12">
          <h2 className="text-4xl font-bold">Current Bids</h2>
          {hasBids ? (
            <ul className="space-y-4">
              {bids.map((bid) => (
                <li className="rounded-xl bg-slate-200 p-8" key={bid.id}>
                  <div>
                    <span className="font-bold">${bid.amount}</span> by{" "}
                    <span className="font-bold">{bid.userName}</span>{" "}
                    <span className="font-normal">
                      {formatTimeStamp(bid.timestamp)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center gap-5 rounded-xl bg-gray-200 p-8">
              {" "}
              <Image
                src={"/package.svg"}
                alt="404"
                sizes="100vw"
                width={0}
                height={0}
                className="h-full w-full max-w-[450px]"
              />
              <h3 className="text-2xl font-bold"> No bids yet.</h3>
              <Button>Place a Bid</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ItemPage;

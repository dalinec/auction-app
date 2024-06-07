import { Button } from "@/components/ui/button";
import { getBidsForItem } from "@/data-access/bids";
import { getItem } from "@/data-access/items";
import { cn } from "@/lib/utils";
import { formatToDolars } from "@/utils/currency";
import { getImageUrl } from "@/utils/files";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { createBidAction } from "./actions";

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
  const item = await getItem(parseInt(itemId));

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

  const allBids = await getBidsForItem(item.id);

  const hasBids = allBids.length > 0;

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
          <div className="flex w-full items-center justify-between">
            <h2 className="text-4xl font-bold">Current Bids</h2>
            {hasBids ? (
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            ) : null}
          </div>
          {hasBids ? (
            <ul className="space-y-4">
              {allBids.map((bid) => (
                <li className="rounded-xl bg-slate-200 p-8" key={bid.id}>
                  <div>
                    <span className="font-bold">
                      ${formatToDolars(bid.amount)}
                    </span>{" "}
                    by <span className="font-bold">{bid.user.name}</span>{" "}
                    <span className="font-normal">
                      {formatTimeStamp(bid.timestapmp)}
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
              {/* pass a argument to a promise */}
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ItemPage;

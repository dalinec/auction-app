import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const EmptyState = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center space-y-8">
      <Image
        src={"/package.svg"}
        alt="404"
        sizes="100vw"
        width={0}
        height={0}
        className="h-full w-full max-w-[450px]"
      />
      <h2 className="text-2xl font-bold">You have no auctions yet.</h2>
      <Button asChild>
        <Link href={"/items/create"}>Create Auction</Link>
      </Button>
    </div>
  );
};

export default EmptyState;

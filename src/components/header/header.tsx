import Image from "next/image";
import { SignOut } from "../ui/sign-out";
import { SignIn } from "../ui/sign-in";
import { auth } from "@/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <div className="bg-gray-200 py-4">
      <div className="container flex items-center justify-between">
        {/* logo */}
        <Link className="flex items-center gap-3" href={"/"}>
          <Image
            src={"/logo.svg"}
            width={0}
            height={0}
            sizes="100vw"
            className="size-[50px]"
            alt="logo"
          />
          <span className="text-xl font-semibold">Auction App</span>
        </Link>
        {/* menu */}
        <div className="ml-8 flex flex-1 items-center justify-start">
          <Link className="ml-5 min-w-fit" href={"/"}>
            <span className="text-xl font-semibold">All Auctions</span>
          </Link>
          <Link className="ml-5 min-w-fit" href={"/items/create"}>
            <span className="text-xl font-semibold">Create Auction</span>
          </Link>
          <Link className="ml-5 min-w-fit" href={"/auctions"}>
            <span className="text-xl font-semibold">My Auctions</span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span>{session?.user.name}</span>
          <span>{session ? <SignOut /> : <SignIn />}</span>
        </div>
      </div>
    </div>
  );
}

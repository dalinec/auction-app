"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createItemAction, createUploadUrlAction } from "./actions";
import { cn } from "@/lib/utils";

export default function CreatePage() {
  return (
    <main className="flex flex-col gap-5">
      <h1 className={cn("title")}>Post an Item to sell</h1>
      <form
        className="flex w-full flex-col gap-5 rounded-xl border border-slate-400 p-8 md:max-w-[450px]"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get("file") as File;

          const uploadUrl = await createUploadUrlAction(file.name, file.type);

          await fetch(uploadUrl, {
            method: "PUT",
            body: file,
          });

          const name = formData.get("name") as string;
          const startingPrice = parseInt(
            formData.get("startingPrice") as string,
          );
          const startingPriceInCents = Math.floor(startingPrice * 100);

          await createItemAction({
            name,
            startingPrice: startingPriceInCents,
            fileName: file.name,
          });
        }}
      >
        <Input
          required
          name="name"
          id="name"
          placeholder="Name your item"
          className="w-full border-gray-400 text-black placeholder:text-black md:max-w-[450px]"
        />
        <Input
          required
          name="startingPrice"
          id="startingPrice"
          type="number"
          step="0.01"
          placeholder="Starting price"
          className="w-full border-gray-400 text-black placeholder:text-black md:max-w-[450px]"
        />
        <Input type="file" name="file" />
        <Button className="ml-auto w-full md:max-w-fit" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}

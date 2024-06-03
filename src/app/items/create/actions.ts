"use server";

import { database } from "@/db/database";
import { auth } from "@/auth";
import { items } from "@/db/schema";
import { redirect } from "next/navigation";
import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createItemAction(formData: FormData) {
  const session = await auth();

  if (!session) {
    throw new Error("Unauthotized!");
  }

  const user = session.user;

  if (!user || !user.id) {
    throw new Error("Unauthotized");
  }

  const startingPrice = formData.get("startingPrice") as string;
  const priceAsCents = Math.floor(parseFloat(startingPrice) * 100);

  await database.insert(items).values({
    name: formData.get("name") as string,
    startingPrice: priceAsCents,
    userId: user.id,
  });
  redirect("/");
}

export async function createUploadUrlAction(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

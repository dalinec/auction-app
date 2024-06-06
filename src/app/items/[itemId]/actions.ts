"use server";
import { database } from "@/db/database";

import { auth } from "@/auth";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createBidAction(itemId: number) {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    throw new Error("You must be logged in order to place a bid!");
  }

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    throw new Error("Item not found!");
  }

  const latestBidValue = item.currentBid + item.bidInterval;

  const insertBidPromise = database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId: session.user.id,
    timestapmp: new Date(),
  });

  const updateItemPromise = database
    .update(items)
    .set({ currentBid: latestBidValue })
    .where(eq(items.id, itemId));

  await Promise.all([insertBidPromise, updateItemPromise]);

  revalidatePath(`/items/${itemId}`);
}

import { auth } from "@/auth";
import ItemCard from "@/components/item-card/item-card";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import EmptyState from "./empty-state";

const MyAuctionsPage = async () => {
  const session = await auth();

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const allItems = await database.query.items.findMany({
    where: eq(items.userId, session.user.id),
  });

  const hasItems = allItems.length > 0;

  return (
    <main className="container mx-auto flex flex-col gap-5 py-12">
      <h1 className="text-2xl font-bold">Your current Auctions</h1>
      {hasItems ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {allItems.map((item, i) => {
            return <ItemCard key={i} item={item} />;
          })}
        </div>
      ) : (
        <EmptyState />
      )}
    </main>
  );
};
  
export default MyAuctionsPage;

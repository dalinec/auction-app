import ItemCard from "@/components/item-card/item-card";
import { database } from "@/db/database";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="flex flex-col gap-5">
      <h1 className={cn("title")}>Items for sale</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {allItems.map((item, i) => {
          return <ItemCard key={i} item={item} />;
        })}
      </div>
    </main>
  );
}

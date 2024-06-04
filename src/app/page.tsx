import ItemCard from "@/components/item-card/item-card";
import { database } from "@/db/database";

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto flex flex-col gap-5 py-12">
      <h1 className="text-2xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {allItems.map((item, i) => {
          return <ItemCard key={i} item={item} />;
        })}
      </div>
    </main>
  );
}

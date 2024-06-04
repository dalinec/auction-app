import { database } from "@/db/database";
import Image from "next/image";

const getImageUrl = (fileKey: string) => {
  return `https://pub-2ea83693adf649f5bd25828080ad8a37.r2.dev/${fileKey}
  `;
};

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className="container mx-auto flex flex-col gap-5 py-12">
      <h1 className="text-2xl font-bold">Items for sale</h1>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {allItems.map((item, i) => {
          return (
            <div key={i}>
              <div className="flex flex-col gap-5 rounded-xl border border-slate-300 p-6 shadow-lg">
                <Image
                  src={getImageUrl(item.fileKey)}
                  alt={item.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-auto w-full lg:h-[150px]"
                />
                <div className="flex flex-col">
                  <span>{item.name}</span>
                  <span>Starting price: {item.startingPrice / 100} €</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

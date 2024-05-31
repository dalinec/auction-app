import { database } from '@/db/database';

export default async function HomePage() {
  const allItems = await database.query.items.findMany();

  return (
    <main className='container mx-auto flex flex-col gap-5 py-12'>
      <h1 className='text-2xl font-bold'>Items for sale</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {allItems.map((item, i) => {
          return (
            <div key={i}>
              <div className='border flex flex-col gap-5 p-8 rounded-xl border-slate-300 shadow-lg'>
                <span>{item.name}</span>
                <span>Starting price: {item.startingPrice / 100} €</span>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

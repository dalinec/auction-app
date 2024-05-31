import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export default async function HomePage() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  return (
    <main className='container mx-auto flex flex-col gap-5 py-12'>
      <h1 className='text-4xl font-bold'>Post an Item to sell</h1>
      <form
        className='border p-8 border-slate-400 rounded-xl w-full md:max-w-[450px]'
        action={async (formData: FormData) => {
          'use server';
          await database.insert(items).values({
            name: formData.get('name') as string,
            userId: session?.user?.id!,
          });
          revalidatePath('/'); //use to refrest to the latest data
        }}
      >
        <div className='flex flex-col md:flex-row gap-5'>
          <Input
            name='name'
            id='name'
            placeholder='Name your item'
            className='text-black w-full md:max-w-[450px] placeholder:text-black border-gray-400'
          />
          <Button type='submit'>Post Item</Button>
        </div>
      </form>
      <h2 className='text-2xl font-bold'>Items for sale</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
        {allItems.map((item, i) => {
          return (
            <div key={i}>
              <div className='border p-8 rounded-xl border-slate-300 shadow-lg'>
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignIn } from '@/components/ui/sign-in';
import { SignOut } from '@/components/ui/sign-out';
import { database } from '@/db/database';
import { items } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export default async function HomePage() {
  const session = await auth();
  const allItems = await database.query.items.findMany();

  console.log(session);

  // if (!session) return null;

  // const user = session.user;

  // if (!user) return null;

  return (
    <main className='container mx-auto flex flex-col gap-5 py-12'>
      {session ? <SignOut /> : <SignIn />}
      {session?.user?.name}
      <form
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

      {allItems.map((item, i) => {
        return (
          <div key={i}>
            <div>{item.name}</div>
          </div>
        );
      })}
    </main>
  );
}

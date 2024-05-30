import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignIn } from '@/components/ui/sign-in';
import { SignOut } from '@/components/ui/sign-out';
import { database } from '@/db/database';
import { bids as bidsSchema } from '@/db/schema';
import { revalidatePath } from 'next/cache';

export default async function HomePage() {
  const bids = await database.query.bids.findMany();

  const session = await auth();

  return (
    <main className='container mx-auto flex flex-col gap-5 py-12'>
      {session ? <SignOut /> : <SignIn />}
      {session?.user?.name}
      <form
        action={async (formData: FormData) => {
          'use server';
          // const bid = formData.get('bid') as string;
          await database.insert(bidsSchema).values({});
          revalidatePath('/'); //use to refrest to the latest data
        }}
      >
        <div className='flex flex-col md:flex-row gap-5'>
          <Input
            name='bid'
            placeholder='Bid'
            className='text-black w-full md:max-w-[450px] placeholder:text-black border-gray-400'
          />
          <Button type='submit'>Place Bid</Button>
        </div>
      </form>

      {bids.map((bid, i) => {
        return (
          <div key={i}>
            <div>{bid.id}</div>
          </div>
        );
      })}
    </main>
  );
}

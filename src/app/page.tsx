import { database } from '@/db/database';
import { bids as bidsSchema } from '@/db/schema';

export default async function HomePage() {
  const bids = await database.query.bids.findMany();

  return (
    <main className='container mx-auto py-12'>
      <form
        action={async (formData: FormData) => {
          'use server';
          // const bid = formData.get('bid') as string;
          await database.insert(bidsSchema).values({});
        }}
      >
        <input
          name='bid'
          placeholder='Bid'
          className='text-black placeholder:text-black'
        />
        <button type='submit'>Place Bid</button>
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

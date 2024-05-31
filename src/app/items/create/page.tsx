import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createItemAction } from './actions';

export default async function CreatePage() {
  return (
    <main className='container mx-auto flex flex-col gap-5 py-12'>
      <h1 className='text-4xl font-bold'>Post an Item to sell</h1>
      <form
        className='border p-8 flex gap-5 flex-col border-slate-400 rounded-xl w-full md:max-w-[450px]'
        action={createItemAction}
      >
        <Input
          required
          name='name'
          id='name'
          placeholder='Name your item'
          className='text-black w-full md:max-w-[450px] placeholder:text-black border-gray-400'
        />
        <Input
          required
          name='startingPrice'
          id='startingPrice'
          type='number'
          step='0.01'
          placeholder='Starting price'
          className='text-black w-full md:max-w-[450px] placeholder:text-black border-gray-400'
        />
        <Button className='w-full md:max-w-fit ml-auto' type='submit'>
          Post Item
        </Button>
      </form>
    </main>
  );
}

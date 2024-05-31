import Image from 'next/image';
import { SignOut } from '../ui/sign-out';
import { SignIn } from '../ui/sign-in';
import { auth } from '@/auth';
import Link from 'next/link';

export default async function Header() {
  const session = await auth();
  return (
    <div className='bg-gray-200 py-4'>
      <div className='container flex items-center justify-between'>
        {/* logo */}
        <Link className='flex items-center gap-3' href={'/'}>
          <Image
            src={'/logo.svg'}
            width={0}
            height={0}
            sizes='100vw'
            className='size-[50px]'
            alt='logo'
          />
          <span className='font-semibold text-xl'>Auction App</span>
        </Link>
        {session ? <SignOut /> : <SignIn />}
      </div>
    </div>
  );
}

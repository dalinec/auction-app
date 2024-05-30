import { middleware } from './auth.config';
import { NextResponse } from 'next/server';

export default middleware((req) => {
  console.log(
    'Middleware is now running without importing my adapter, thanks elbajo'
  );
});

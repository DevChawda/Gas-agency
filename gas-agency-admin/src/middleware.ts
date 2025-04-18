// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   // const token = localStorage.getItem('adminToken')
//   const token = request.cookies.get('adminToken');
//   console.log("🛡️ Middleware Token:", token);

//   if (request.nextUrl.pathname.startsWith('/')) {
//     if (!token) {
//       const loginUrl = new URL('/login', request.url);
//       console.log("loginUrl",loginUrl)
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   return NextResponse.next();
// }

// // ✅ Match all routes under /admin
// export const config = {
//   matcher: ['/admin/:path*'],
// };

// Temporarily disabled middleware to fix Vercel deployment
// import createMiddleware from 'next-intl/middleware';

// export default createMiddleware({
//   // A list of all locales that are supported
//   locales: ['en', 'ar'],

//   // Used when no locale matches
//   defaultLocale: 'en'
// });

// export const config = {
//   // Match only internationalized pathnames, exclude API routes
//   matcher: [
//     // Skip all internal paths (_next)
//     '/((?!_next|api|_next/static|_next/image|favicon.ico).*)',
//     // Enable middleware for all other paths
//     '/((?!api|_next/static|_next/image|favicon.ico).*)'
//   ]
// };

export default function middleware(request: Request) {
  // Basic middleware without next-intl
  return;
}

export const config = {
  matcher: []
};

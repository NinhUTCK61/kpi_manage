export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/file/:path*', '/profile', '/change-password', '/favorite'],
}

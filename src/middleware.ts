import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

// export

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization')
  const url = req.nextUrl

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1] as string
    const [user, pwd] = atob(authValue).split(':')

    if (user === 'kpi_master' && pwd === 'kpi@master123') {
      return withAuth(req as NextRequestWithAuth)
    }
  }
  url.pathname = '/api/basic-auth'

  return NextResponse.rewrite(url)
}

// export { withAuth } from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/file/:path*', '/profile', '/change-password', '/favorite'],
}

import { env } from '@/env.mjs'

export const getImageUrl = (key: string) => `${env.NEXT_PUBLIC_AWS_S3_ENDPOINT}/${key}`

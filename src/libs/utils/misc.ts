import { env } from '@/env.mjs'

export const getImageUrl = (key: string) => `${env.NEXT_PUBLIC_AWS_S3_ENDPOINT}/${key}`

export const pxToNumber = (val: string | undefined) => Number(val?.split('px')[0])
export const toPx = (val: number) => `${val}px`

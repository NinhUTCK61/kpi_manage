import { env } from '@/env.mjs'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export class UtilsService {
  async createPreSignedUrl(key: string) {
    const client = new S3Client({
      region: env.AWS_S3_REGION,
      credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY,
      },
    })

    const command = new PutObjectCommand({ Bucket: env.AWS_S3_BUCKET, Key: key })
    const result = await getSignedUrl(client, command, { expiresIn: 1800 })
    return result
  }
}

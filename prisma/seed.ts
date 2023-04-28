import { PrismaClient, Reason, ReasonType } from '@prisma/client'

const prisma = new PrismaClient()

const KPI_REASON: Reason[] = [
  {
    id: 1,
    text_ja: 'KPIツリーを知らない、作成したことがない',
    text_en: "I don't know what a KPI tree is, and I've never created one",
    type: ReasonType.ISSUE,
    is_enabled: true,
    order: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 2,
    text_ja: 'KPI策定の仕方がわからない',
    text_en: "I don't know how to set KPIs",
    type: ReasonType.ISSUE,
    is_enabled: true,
    order: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 3,
    text_ja: 'なんとなくKPIを作成している',
    text_en: "I'm creating KPIs somewhat vaguely",
    type: ReasonType.ISSUE,
    is_enabled: true,
    order: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 4,
    text_ja: 'KPIが多すぎて取捨選択できていない',
    text_en: "I have too many KPIs and can't choose between them",
    type: ReasonType.ISSUE,
    is_enabled: true,
    order: 4,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 5,
    text_ja: 'KPIをうまく管理できるツールを知らない',
    text_en: "I don't know any tools to manage KPIs effectively",
    type: ReasonType.ISSUE,
    is_enabled: true,
    order: 5,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 6,
    text_ja: 'その他',
    text_en: 'Other',
    type: ReasonType.ISSUE,
    is_enabled: true,
    order: 6,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 7,
    text_ja: '口コミ・知り合いの紹介',
    text_en: 'Word of mouth and referrals from acquaintances',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 1,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 8,
    text_ja: 'Facebook',
    text_en: 'Facebook',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 2,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 9,
    text_ja: 'Twitter',
    text_en: 'Twitter',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 3,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 10,
    text_ja: 'note',
    text_en: 'note',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 4,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 11,
    text_ja: 'コミュニティ',
    text_en: 'Community',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 5,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 12,
    text_ja: 'Google / Yahoo! などの検索',
    text_en: 'Search on Google / Yahoo!, etc.',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 6,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 13,
    text_ja: 'プレスリリース',
    text_en: 'Press Release',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 7,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 14,
    text_ja: 'WEB記事',
    text_en: 'Web Article',
    type: ReasonType.REASON_KNOW,
    order: 8,
    is_enabled: true,
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    id: 15,
    text_ja: 'その他',
    text_en: 'Other',
    type: ReasonType.REASON_KNOW,
    is_enabled: true,
    order: 9,
    created_at: new Date(),
    updated_at: new Date(),
  },
]

async function main() {
  const reason = await prisma.reason.createMany({
    data: KPI_REASON,
    skipDuplicates: true,
  })

  console.log('seed success', reason)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

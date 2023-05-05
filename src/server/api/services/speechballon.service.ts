export class SpeechBallonService {
  // async create({ template_id, ...speechBallonData }: z.infer<typeof speechBallonSchema>) {
  //   console.log('-----------', template_id)
  //   return template_id
  // const checkUserTemplate = await prisma.userTemplate.findFirst({
  //   where: {
  //     user_id: user.id,
  //     template_id,
  //     template: {
  //       deleted_at: null,
  //     },
  //   },
  // })

  // if (!checkUserTemplate) {
  //   throw new TRPCError({
  //     code: 'NOT_FOUND',
  //     message: 'error.template_not_found',
  //   })
  // }

  // const speechBallon = await prisma.speechBallon.create({
  //   data: {
  //     template_id,
  //     ...speechBallonData,
  //   },
  // })

  // return speechBallon
  // }

  async create(template_id: string) {
    return template_id
  }
}

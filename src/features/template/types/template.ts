enum StatusTemplate {
  all,
  deleted,
}

enum FileAction {
  UpdateThumbnail,
  Delete,
  Restore,
  DeletePermanently,
}

type TemplateTypes = {
  id: string
  rootNodeId: string
  name: string
  image_url: string
  public_url: string
  delete_at: string
}

export { StatusTemplate, FileAction }
export type { TemplateTypes }

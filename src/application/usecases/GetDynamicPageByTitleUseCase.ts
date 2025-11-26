import type { IDynamicPage } from "../../domain/entities/IDynamicPage";
import type { IDynamicPageRepository } from "../interfaces/IDynamicPageRepository";

export class GetDynamicPageByTextUseCase {
  constructor(private repo: IDynamicPageRepository) {}

  execute(title: string): Promise<IDynamicPage> {
    return this.repo.getDynamicPageByTitle(title);
  }
}


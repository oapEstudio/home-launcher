import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IDynamicPage } from "../../../domain/entities/IDynamicPage";
import type { IDynamicPageRepository } from "../../../application/interfaces/IDynamicPageRepository";


export class DynamicPageRepository extends RepositoryAbstract implements IDynamicPageRepository {

  resource = env.resources.dynamic_pages;

  async getDynamicPageByTitle(title: string): Promise<IDynamicPage> {
    const version = this.resource.getByTitle.page.version;
    const url = this.resource.getByTitle.page.endpoint.replace('{title}', title);

    const res = await apiHandler.get<IDynamicPage>(this.resolveURL(url, version));

    return res.data;
  }

}
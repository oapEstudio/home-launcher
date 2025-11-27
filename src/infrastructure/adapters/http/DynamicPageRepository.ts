import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";
import { env } from "../../config/env";
import type { IDynamicPage } from "../../../domain/entities/IDynamicPage";
import type { IDynamicPageRepository } from "../../../application/interfaces/IDynamicPageRepository";


export class DynamicPageRepository extends RepositoryAbstract implements IDynamicPageRepository {

  resource = env.resources.dynamic_pages;

  async getDynamicPageByTitle(title: string): Promise<IDynamicPage> {
    const rawVersion = this.resource.getByTitle.page.version ?? 'v1';
    const v = rawVersion.startsWith('v') ? rawVersion : `v${rawVersion}`;

    const endpointTpl = this.resource.getByTitle.page.endpoint; // "pages/{title}"
    const endpoint = endpointTpl.replace('{title}', encodeURIComponent(title));

    let base = (env.baseURL ?? '').replace(/\/+$/, '');

    const shouldAddApi = !/\/api$/.test(base);

    const fullUrl = `${base}${shouldAddApi ? '/api' : ''}/${v}/${endpoint}`
      .replace(/(?<!:)\/{2,}/g, '/'); 

    const res = await apiHandler.get<IDynamicPage>(fullUrl);
    return res.data;
  }

}
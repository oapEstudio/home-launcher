import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IMenuHomeRepository } from "../../../application/interfaces/IMenuHomeRepository";
import type { IMenuHome } from "../../../domain/entities/IMenuHome";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class MenuHomeRepository extends RepositoryAbstract implements IMenuHomeRepository {
    
    resource = env.resources.menuHome;
    
    async getMenues(params: IPageParameters): Promise<IPaginatedResponse<IMenuHome>> {

        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
        
        const version = this.resource.getAll.version;
        const url = `${this.resource.getAll.endpoint}?${qs}`;
       
       
        const response = await apiHandler.get<IPaginatedResponse<IMenuHome>>(this.resolveURL(url,version));
       
        return response.data;
    }

}


import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { IHelpRepository } from "../../../application/interfaces/IHelpRepository";
import type { INotificationCommonRepository } from "../../../application/interfaces/INotificationCommonRepository";
import type { IHelp } from "../../../domain/entities/IHelp";
import type { INotificationCommon } from "../../../domain/entities/INotificationCommon";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class HelpRepository extends RepositoryAbstract implements IHelpRepository{
    
    resource = env.resources.helps;
    
    async getHelp(params: IPageParameters): Promise<IPaginatedResponse<IHelp>> {
        
        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
               
        const version = this.resource.getAll.version;
        const url = `${this.resource.getAll.endpoint}?${qs}`;
              
              
        const response = await apiHandler.get<IPaginatedResponse<IHelp>>(this.resolveURL(url,version));
              
        return response.data;
    }
}
import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { INotificationCommonRepository } from "../../../application/interfaces/INotificationCommonRepository";
import type { INotificationCommon } from "../../../domain/entities/INotificationCommon";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class NotificationCommonRepository extends RepositoryAbstract implements INotificationCommonRepository{
    
    resource = env.resources.notificationCommon;
    
    async getNotificationCommon(params: IPageParameters): Promise<IPaginatedResponse<INotificationCommon>> {
        
        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
               
        const version = this.resource.getAll.version;
        const url = `${this.resource.getAll.endpoint}?${qs}`;
              
              
        const response = await apiHandler.get<IPaginatedResponse<INotificationCommon>>(this.resolveURL(url,version));
              
        return response.data;
    }

     async updateNotifications(){
    
         const url = this.resource.update.endpoint;
         const version = this.resource.update.version;
    
         const res = await apiHandler.put<any>(this.resolveURL(url,version),{},{});
    
         return res.data;
      }
}
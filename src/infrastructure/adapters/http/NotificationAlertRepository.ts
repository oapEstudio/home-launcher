import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { INotificationAlertRepository } from "../../../application/interfaces/INotificationAlertRepository";
import type { INotificationAlert } from "../../../domain/entities/IAlert";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class NotificationAlertRepository extends RepositoryAbstract implements INotificationAlertRepository{
    
    resource = env.resources.notificationAlert;
    
    async getNotificationAlert(params: IPageParameters): Promise<IPaginatedResponse<INotificationAlert>> {
        
        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
               
        const version = this.resource.getAll.version;
        const url = `${this.resource.getAll.endpoint}?${qs}`;
              
              
        const response = await apiHandler.get<IPaginatedResponse<INotificationAlert>>(this.resolveURL(url,version));
              
        return response.data;
    }

}
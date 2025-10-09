import type { IPageParameters, IPaginatedResponse } from "../../../application/common/IPaginatedResponse";
import type { INotificationCarouselRepository } from "../../../application/interfaces/INotificationCarouselRepository";
import type { INotificationCarousel } from "../../../domain/entities/ISlide";
import { env } from "../../config/env";
import { apiHandler } from "./apiHandler";
import { RepositoryAbstract } from "./RepositoryAbstract";

export class NotificationCarouselRepository extends RepositoryAbstract implements INotificationCarouselRepository{
    
    resource = env.resources.notificationCarousel;
    
    async getNotificationCarousel(params: IPageParameters): Promise<IPaginatedResponse<INotificationCarousel>> {
        
        const mapped = this.paramsMap(params);
        const qs = this.toQueryStringPagination(mapped);
               
        const version = this.resource.getAll.version;
        const url = `${this.resource.getAll.endpoint}?${qs}`;
              
              
        const response = await apiHandler.get<IPaginatedResponse<INotificationCarousel>>(this.resolveURL(url,version));
              
        return response.data;
    }

}
import type { INotificationCarousel } from "../../domain/entities/ISlide";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface INotificationCarouselRepository{
    
    getNotificationCarousel(params: IPageParameters): Promise<IPaginatedResponse<INotificationCarousel>>;
}
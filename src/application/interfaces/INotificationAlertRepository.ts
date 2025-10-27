import type { INotificationAlert } from "../../domain/entities/IAlert";
import type { INotificationCarousel } from "../../domain/entities/ISlide";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface INotificationAlertRepository{
    
    getNotificationAlert(params: IPageParameters): Promise<IPaginatedResponse<INotificationAlert>>;
}
import type { INotificationCommon } from "../../domain/entities/INotificationCommon";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface INotificationCommonRepository{
    
    getNotificationCommon(params: IPageParameters): Promise<IPaginatedResponse<INotificationCommon>>;
    updateNotifications(): Promise<INotificationCommon>
}
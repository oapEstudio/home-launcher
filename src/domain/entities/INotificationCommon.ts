export interface INotificationCommon {
    notificationTypeId:       number;
    name:                     string;
    title:                    string;
    buttonText:               string;
    buttonLink:               string;
    description:              string;
    notificationCommonTypeId: number;
    notificationCommonType:   string;
    dateUpdated:              Date;
    read:                     boolean;
}
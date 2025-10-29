import React from 'react';


import { MenuHomeRepository } from '../../infrastructure/adapters/http/MenuHomeRepository';
import { GetMenuHomeUseCase } from '../../application/usecases/GetMenuHomeUseCase';
import { GetHighlightUseCase } from '../../application/usecases/GetHighlightUseCase';
import { HighlightRepository } from '../../infrastructure/adapters/http/HighlightRepository';
import { GetNotificationCarouselUseCase } from '../../application/usecases/GetNotificationCarouselUseCase';
import { NotificationCarouselRepository } from '../../infrastructure/adapters/http/NotificationCarouselRepository';
import { NotificationAlertRepository } from '../../infrastructure/adapters/http/NotificationAlertRepository';
import { GetNotificationAlertUseCase } from '../../application/usecases/GetNotificationAlertUseCase';
import { GetNotificationCommonUseCase } from '../../application/usecases/GetNotificationCommonUseCase';
import { NotificationCommonRepository } from '../../infrastructure/adapters/http/NotificationCommonRepository';
import { UpdateNotificationCommonUseCase } from '../../application/usecases/UpdateNotificationCommonUseCase';
import { GetHelpUseCase } from '../../application/usecases/GetHelpUseCase';
import { HelpRepository } from '../../infrastructure/adapters/http/HelpRepository';


const menuHomeRepo = new MenuHomeRepository();
const highlightRepo = new HighlightRepository();
const notificationCarousel = new NotificationCarouselRepository();
const notificationAlertRepo = new NotificationAlertRepository();
const notificationCommonRepo = new NotificationCommonRepository();
const helpRepo = new HelpRepository();


//const filterRepo = new DatasetFilterRepository();


export interface IDependencies{

  getNotificationCarousel: GetNotificationCarouselUseCase;
  getMenuesHome: GetMenuHomeUseCase;
  getHighlighteds: GetHighlightUseCase;
  getNotificationAlert: GetNotificationAlertUseCase;
  getNotificationCommon: GetNotificationCommonUseCase;
  updateNotificationCommon: UpdateNotificationCommonUseCase;
  getHelp: GetHelpUseCase;
}



export const defaultDependencies: IDependencies = {
  getMenuesHome: new GetMenuHomeUseCase(menuHomeRepo),
  getHighlighteds: new GetHighlightUseCase(highlightRepo),
  getNotificationCarousel: new GetNotificationCarouselUseCase(notificationCarousel),
  getNotificationAlert: new GetNotificationAlertUseCase(notificationAlertRepo),
  getNotificationCommon: new GetNotificationCommonUseCase(notificationCommonRepo),
  updateNotificationCommon: new UpdateNotificationCommonUseCase(notificationCommonRepo),
  getHelp: new GetHelpUseCase(helpRepo),
};

export const DependencyContext = React.createContext<IDependencies>(defaultDependencies);

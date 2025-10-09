import React from 'react';


import { MenuHomeRepository } from '../../infrastructure/adapters/http/MenuHomeRepository';
import { GetMenuHomeUseCase } from '../../application/usecases/GetMenuHomeUseCase';
import { GetHighlightUseCase } from '../../application/usecases/GetHighlightUseCase';
import { HighlightRepository } from '../../infrastructure/adapters/http/HighlightRepository';
import { GetNotificationCarouselUseCase } from '../../application/usecases/GetNotificationCarouselUseCase';
import { NotificationCarouselRepository } from '../../infrastructure/adapters/http/NotificationCarouselRepository';


const menuHomeRepo = new MenuHomeRepository();
const highlightRepo = new HighlightRepository();
const notificationCarousel = new NotificationCarouselRepository();

//const filterRepo = new DatasetFilterRepository();


export interface IDependencies{

  getNotificationCarousel: GetNotificationCarouselUseCase;
  getMenuesHome: GetMenuHomeUseCase;
  getHighlighteds: GetHighlightUseCase;
}



export const defaultDependencies: IDependencies = {
  getMenuesHome: new GetMenuHomeUseCase(menuHomeRepo),
  getHighlighteds: new GetHighlightUseCase(highlightRepo),
  getNotificationCarousel: new GetNotificationCarouselUseCase(notificationCarousel)
};

export const DependencyContext = React.createContext<IDependencies>(defaultDependencies);

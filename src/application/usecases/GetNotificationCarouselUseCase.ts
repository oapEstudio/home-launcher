import type { INotificationCarousel } from "../../domain/entities/ISlide";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { INotificationCarouselRepository } from "../interfaces/INotificationCarouselRepository";

export class GetNotificationCarouselUseCase {
    
  constructor(private repo: INotificationCarouselRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<INotificationCarousel>> {
     try {
        return this.repo.getNotificationCarousel(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los slides: ${err.message}`)
        }
        throw err
    }
    
  }
}
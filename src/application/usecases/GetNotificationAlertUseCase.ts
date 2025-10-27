import type { INotificationAlert } from "../../domain/entities/IAlert";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { INotificationAlertRepository } from "../interfaces/INotificationAlertRepository";

export class GetNotificationAlertUseCase {
    
  constructor(private repo: INotificationAlertRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<INotificationAlert>> {
     try {
        return this.repo.getNotificationAlert(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo cargar la alerta: ${err.message}`)
        }
        throw err
    }
    
  }
}
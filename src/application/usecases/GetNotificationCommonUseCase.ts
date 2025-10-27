import type { INotificationCommon } from "../../domain/entities/INotificationCommon";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { INotificationCommonRepository } from "../interfaces/INotificationCommonRepository";

export class GetNotificationCommonUseCase {
    
  constructor(private repo: INotificationCommonRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<INotificationCommon>> {
     try {
        return this.repo.getNotificationCommon(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudo cargar la alerta: ${err.message}`)
        }
        throw err
    }
    
  }
}
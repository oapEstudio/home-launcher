import type { INotificationCommonRepository } from "../interfaces/INotificationCommonRepository";

export class UpdateNotificationCommonUseCase{
    
    constructor(private repo: INotificationCommonRepository){}


    async execute(){
        try {
            return this.repo.updateNotifications()
          } catch (err) {
            
              if (err instanceof Error) {
                throw new Error(`No se pudieron actualizar las notificaciones: ${err.message}`)
              }
              throw err
          }           
    }
}
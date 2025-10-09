import type { IMenuHome } from "../../domain/entities/IMenuHome";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";
import type { IMenuHomeRepository } from "../interfaces/IMenuHomeRepository";

export class GetMenuHomeUseCase {
    
  constructor(private repo: IMenuHomeRepository) {}

  async execute(params: IPageParameters): Promise<IPaginatedResponse<IMenuHome>> {
     try {
        return this.repo.getMenues(params);
    } catch (err) {
      
        if (err instanceof Error) {
          throw new Error(`No se pudieron cargar los menues: ${err.message}`)
        }
        throw err
    }
    
  }
}
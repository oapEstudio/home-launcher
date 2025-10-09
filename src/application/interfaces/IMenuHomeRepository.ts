import type { IMenuHome } from "../../domain/entities/IMenuHome";
import type { IPageParameters, IPaginatedResponse } from "../common/IPaginatedResponse";

export interface IMenuHomeRepository {
  getMenues(params: IPageParameters): Promise<IPaginatedResponse<IMenuHome>>;
}
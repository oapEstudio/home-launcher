import type { IDynamicPage } from "../../domain/entities/IDynamicPage";

export interface IDynamicPageRepository{
    getDynamicPageByTitle(title: string): Promise<IDynamicPage>;
}
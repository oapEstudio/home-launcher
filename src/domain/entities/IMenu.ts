import type { IProfile } from "./IProfile";

export interface IMenu {
    id:                    string;
    name:                  string;
    description:           string;
    itemStatusId:          number;
    itemStatusDescription: string;
    parentId:              null | string;
    link:                  string;
    hierarchyIndex:        number;
    canBeHighlighted:      boolean;
    isHighlighted:         boolean;
    profiles:              IProfile[];
    children:              IMenu[];
}


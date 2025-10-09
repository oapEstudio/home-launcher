export interface IMenuHome {
    id:              string;
    name:            string;
    description:     string;
    parentId:        null | string;
    link:            string;
    hasLink:         boolean;
    orderIndex:      number;
    children:        IMenuHome[];
    hierarchyIndex?: number;
}

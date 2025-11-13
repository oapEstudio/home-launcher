export interface IHelp {
  id: string;
  helpTypeId: number | null;
  helpType: string;
  name: string;
  title: string;
  description: string;
  parentId: number | null;
  parent: IHelp | null;
  link: string;
  statusId: number | null;
  statusDescription: string | null;
  statusColor: string | null;
  helpDocumentTypeId: number;
  helpDocumentType: string;
  document: IDocument[];
  profile: IProfile[]; 
  dateUpdated: string;
  documentLink: string;
  children: IHelp[];
}

interface IDocument {
    id: string;
    link: string;
}

interface IProfile {
    id: string;
    name: string;
}
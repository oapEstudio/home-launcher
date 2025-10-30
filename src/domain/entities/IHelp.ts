export interface IHelp {
  id: string;
  helpTypeId: number | null;
  helpType: string | null;
  name: string;
  title: string;
  description: string;
  parentId: number | null;
  parent: IHelp | null;
  link: string;
  statusId: number | null;
  statusDescription: string | null;
  statusColor: string | null;
  helpDocumentTypeId: number | null;
  helpDocumentType: string | null;
  document: IDocument[];
  profile: IProfile[]; 
  dateUpdated: string;
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
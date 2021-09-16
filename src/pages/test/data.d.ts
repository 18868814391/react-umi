export interface LoginParamsType {
  account: string;
  passwd: string;
  remember: boolean;
}
export interface ListParamsType {
  pageNum: number;
  pageSize: number;
  source: number;
  statusList:any
}
export interface TableListItem {
  id: number;
  name: string;
  desc: string;
  href: string;
  type: string;
  studentName:any;
  questionContent:any;
}

export interface TableDataType {
  list: TableListItem[];
  pagination: PaginationConfig;
}

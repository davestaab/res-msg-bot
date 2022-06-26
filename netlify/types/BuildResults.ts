export interface BuildResults {
  resource: Resource;
  createdDate?: string;
}

export interface Resource {
  status?: string;
  lastChangedBy: Person;
}

export interface Person {
  uniqueName?: string;
}

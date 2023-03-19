type VersionString = `${string}:refs/heads/${string}:${string}`;

export interface BuildResults {
  resource: Resource;
  createdDate?: string;
}

export interface Resource {
  status?: string;
  buildNumber: string;
  sourceGetVersion: VersionString;
  requests: Request[];
  
}

export interface Request {
  requestedFor: Person;
}

export interface Person {
  uniqueName?: string;
}

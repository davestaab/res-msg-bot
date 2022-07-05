export interface BuildStatus {
  what: Status;
  who: string;
  when: string;
  id?: string;
  count?: number;
}

export enum Status {
  BORKD = 'BORKD',
  POOPSMITH = 'POOPSMITH',
  FIXED = 'FIXED',
}

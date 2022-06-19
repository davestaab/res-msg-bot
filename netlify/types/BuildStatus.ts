export interface BuildStatus {
  what: Status;
  who: string;
  when: string;
}

export enum Status {
  BORKD = 'borkd',
  POOPSMITH = 'poopsmith',
  FIXED = 'fixed'
}

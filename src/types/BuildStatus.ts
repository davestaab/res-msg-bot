export interface BuildStatus {
  what: Status;
  who: string;
  when: string;
}

export enum Status {
  BORKD = 'BORKD',
  POOPSMITH = 'POOPSMITH',
  FIXED = 'FIXED',
}

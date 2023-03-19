export type ScenarioBranch = `${'release' | 'feature' | 'fix' | 'heads'}/${string}`;
export interface BuildStatus {
  what: Status;
  who: string;
  when: string;
  id?: string;
  count?: number;
  branch: ScenarioBranch;
}

export enum Status {
  BORKD = 'BORKD',
  POOPSMITH = 'POOPSMITH',
  FIXED = 'FIXED',
}

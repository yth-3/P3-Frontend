/*export type Claim = {
  id: string;
  submitterId: string;
  submitted: Date;
  claimed: number;
  type: string;
  description: string;
  status: string;
  receipt?: string;
  resolverId?: string;
  resolved?: Date;
  settled?: number;
};*/

export type Claim = {
  id: string;
  submitter: User;
  submitted: string;
  claimed: number;
  type: ClaimType;
  description: string;
  status: ClaimStatus;
  receipt?: string;
  resolver?: User;
  resolved?: string;
  settled?: number;
};

export type User = {
  userId: string;
  username: string;
  email: string;
  registered: string;
  active: boolean;
  role: string;
  token?: string;
};

export type ClaimType = {
  typeId: string;
  type: string;
};

export type ClaimStatus = {
  statusId: string;
  status: string;
};

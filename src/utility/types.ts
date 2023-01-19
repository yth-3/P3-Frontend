export type Claim = {
  claimId: string;
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

export type UserRole = {
  roleId: string;
  role: string;
};

export type ClaimType = {
  typeId: string;
  type: string;
};

export type ClaimStatus = {
  statusId: string;
  status: string;
};

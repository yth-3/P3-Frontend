export type Claim = {
  id?: string;
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
};

export type User = {
  active: boolean;
  email: string;
  registered: string;
  role: string;
  token: string;
  userId: string;
  username: string;
};

export type Claim = {
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

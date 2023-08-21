export interface UserCredential {
  userName: string;
  password: string;
}

export interface UserProfile {
  userId: number;
  userName: string;
  displayName: string;
  organization: string;
  group: string;
  roles: string[];
}

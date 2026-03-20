export interface RequestWithUser {
  user: {
    sub: string;
    email: string;
    userId: string;
  };
}

export interface User {
    id: string;
    username: string;
    userId: string;
    userPass: string;
    isAdmin: boolean;
  managesStoreId?: string; // Make sure it's marked as optional
  }
  
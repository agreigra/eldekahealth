export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role?: "ADMIN" | "VISITOR";
  createdAt?: Date;
  updatedAt?: Date;
}

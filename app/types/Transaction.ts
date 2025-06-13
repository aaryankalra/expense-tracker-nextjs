export interface Transaction {
  id: string;
  title: string;
  amount: number;
  desc: string | null;
  type: string;
  userId: string;
  createdAt: Date;
}

// sale.model.ts
export interface SaleEntry {
  product: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  date: string;
  sales: SaleEntry[];
  total: number;
  storeid:string;
}

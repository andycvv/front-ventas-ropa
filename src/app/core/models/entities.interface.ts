export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  createdAt?: string;
  enabled: boolean;
  category: Category
}

export interface Category {
  id?: number;
  name?: string;
  enabled: boolean;
}
import { Inventory } from "./entities.interface";

export interface ProductPreview {
  id: number;
  name: string;
  description: string;
  gender: string;
  price: number;
  categoryName: string;
  images: string[];
  colors: string[]
}

export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryName: string;
  inventories: Inventory[]
}

export interface DashboardDto {
  activedProducts: number;
  activedInventories: number;

  totalProducts: number;
  totalCustomers: number;
  totalInventories: number;
  totalOrders: number;
}
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  gender: string;
  createdAt?: string;
  enabled?: boolean;
  category: Category
}

export interface Category {
  id?: number;
  name?: string;
  enabled?: boolean;
}

export interface Color {
  id?: number;
  name?: string;
  code?: string;
  enabled?: boolean;
}

export interface Size {
  id?: number;
  value?: string;
  enabled?: boolean;
}

export interface ImageProduct {
  id?: number;
  url?: string;
}

export interface Inventory {
  id?: number;
  stock?: number;
  enabled?: boolean;
  product: Product;
  size: Size;
  color: Color;
  imageProducts: ImageProduct[]
}

export interface Role {
  id?: number;
  name?: string;
}

export interface User {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  role?: Role
}

export interface Address {
  id?: number;
  street: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface Payment {
  id?: number;
  transactionId: string;
  createdAt?: string;
  paymentMethod: string;
  paymentStatus: string;

  cardNumber?: string;  //
  expiryDate?: string;  //
  cvv?: string;         //
}

export interface OrderDetail {
  id?: number;
  quantity: number;
  price: number;
  inventory: Inventory
}

export interface Order {
  id?: number;
  totalAmount?: number;
  createdAt?: string;
  status?: string;
  user: User;
  address: Address;
  payments: Payment[];
  orderDetails: OrderDetail[];
}
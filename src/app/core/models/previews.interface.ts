import { Product } from "./entities.interface";

export interface ProductPreview {
  product: Product;
  images: string[];
  colors: string[];
}
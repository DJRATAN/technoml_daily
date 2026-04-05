export interface Link {
  id: string;
  title: string;
  url: string;
  categoryId: string;
  icon: string;
  customIcon?: string | null; // Base64 string or image URL
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  customIcon?: string | null; // Base64 string or image URL
}

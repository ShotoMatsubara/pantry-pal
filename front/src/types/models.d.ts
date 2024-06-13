// データモデルに関連する型

// カテゴリー
export interface Category {
  id: number;
  category_name: string;
}

// 食材の単位（個、ml、本）
export interface QuantityUnit {
  id: number;
  quantity_unit_name: string;
}

// 食材
export interface Food {
  id: number;
  user_id: number;
  category_id: number;
  food_name: string;
  quantity_value: number;
  quantity_unit_id: number;
  expiration_type: 'best_before' | 'expiration_date';
  expiration_date: string | null;
  quantity_unit_name: string;
}

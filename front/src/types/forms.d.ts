// 共通のフォームデータ型
interface BaseFoodFormData {
  category_id: number;
  food_name: string;
  quantity_value: number;
  quantity_unit_id: number;
  expiration_type: 'best_before' | 'expiration_date';
  expiration_date: string;
}

// 食材作成のフォームデータ型
export interface CreateFoodFormData extends BaseFoodFormData {
  user_id: number;
}

// 食材編集フォームデータ型
export interface EditFoodFormData extends BaseFoodFormData {}

// 期限
export type ExpirationType = 'best_before' | 'expiration_date';

import axios from 'axios';

import backendUrl from '@/config/backendUrl';

// カテゴリー名を取得する
export const getArgumentCategory = (categoryName: string): string => {
  switch (categoryName) {
    case 'staple':
      return '主食';
    case 'meat':
      return '肉';
    case 'seafood':
      return '魚介類';
    case 'vegetable':
      return '野菜';
    case 'fruit':
      return '果物';
    case 'dairy':
      return '乳製品';
    case 'seasoning':
      return '調味料';
    case 'beverage':
      return '飲料';
    case 'other':
      return 'その他';
    default:
      return '';
  }
};

// カテゴリーを取得する
export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories`);
    return response.data.categories;
  } catch (e) {
    console.log('カテゴリーの取得に失敗しました', e);
  }
};

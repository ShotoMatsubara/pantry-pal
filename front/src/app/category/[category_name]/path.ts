import axios from 'axios';

import { Category } from '@/app/main/page';

export const categoryPath = async () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
  try {
    const result = await axios.get(`${backendUrl}/api/categories`);
    const categories = result.data.categories;
    console.log(categories);

    return categories.map((category: Category) => ({
      category_name: category.category_name,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

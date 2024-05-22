import axios from 'axios';
import { Category } from '@/app/main/page';
import React from 'react';
import ClientSidePage from './ClientSidePage';
import { categoryPath } from './path';

type CategoryProps = {
  params: {
    category_name: string;
  };
};

const CategoryPage = async ({ params }: CategoryProps) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
  const categoryName = params.category_name;

  try {
    const result = await axios.get(`${backendUrl}/api/categories`);
    const categories = result.data.categories;
    const category = categories.find((cat: Category) => cat.category_name === categoryName);

    if (!category) {
      return <div>Category not found</div>;
    }

    return <ClientSidePage categoryName={category.category_name} />;
  } catch (error) {
    console.log(error);
    return <div>Error occurred while fetching data</div>;
  }
};

export default CategoryPage;

export const generateStaticParams = async () => {
  return categoryPath();
};

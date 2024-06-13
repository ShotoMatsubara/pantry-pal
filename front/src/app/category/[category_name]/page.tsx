import axios from 'axios';
import React from 'react';

import backendUrl from '@/config/backendUrl';
import ClientSidePage from './ClientSidePage';

import { Category } from '@/types';

type CategoryProps = {
  params: {
    category_name: string;
  };
};

const CategoryPage = async ({ params }: CategoryProps) => {
  const categoryName = params.category_name;
  return <ClientSidePage categoryName={categoryName} />;
};

export default CategoryPage;

export const generateStaticParams = async () => {
  try {
    const result = await axios.get(`${backendUrl}/api/categories`);
    const categories = result.data.categories;

    return categories.map((category: Category) => ({
      category_name: category.category_name,
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};

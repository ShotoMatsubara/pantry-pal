import axios from 'axios';
import { Category } from '@/app/main/page';
import React from 'react';
import ClientSidePage from './ClientSidePage';

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

export const generateStaticParams = () => {
  const categories = [
    { id: 1, category_name: 'staple' },
    { id: 2, category_name: 'meat' },
    { id: 3, category_name: 'seafood' },
    { id: 4, category_name: 'vegetable' },
    { id: 5, category_name: 'fruit' },
    { id: 6, category_name: 'dairy' },
    { id: 7, category_name: 'seasoning' },
    { id: 8, category_name: 'beverage' },
    { id: 9, category_name: 'other' },
  ];
  // const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
  // try {
  //   const result = await axios.get(`${backendUrl}/api/categories`);
  //   const categories = result.data.categories;

  return categories.map((category: Category) => ({
    category_name: category.category_name,
  }));

  // } catch (error) {
  //   console.log(error);
  //   return [];
  // }
};

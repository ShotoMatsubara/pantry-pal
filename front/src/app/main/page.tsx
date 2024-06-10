'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { getArgumentCategory } from '@/lib/categories';

export type Category = {
  id: number;
  category_name: string;
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;

const Main: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/categories`);
        setCategories(response.data.categories);
      } catch (e) {
        console.log('カテゴリーの取得に失敗しました', e);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white py-6'>
      <div className='max-w-md mx-auto px-4'>
        <div className='flex justify-between mb-6'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            onClick={() => router.push('./new')}
          >
            食材の追加
          </button>
          <button
            className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            onClick={() => router.push('./delete_user')}
          >
            サインアウト
          </button>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-xl font-bold mb-6 text-center text-blue-600'>メインページ</h1>
          <div className='mb-8'>
            <div className='grid grid-cols-2 gap-7'>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className='bg-white rounded-lg shadow-md overflow-hidden focus:outline-none transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105'
                  onClick={() => router.push(`/category/${encodeURIComponent(category.category_name)}`)}
                >
                  <div className='relative'>
                    <Image
                      src={`/categories/${category.id}.jpg`}
                      alt={category.category_name}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                      className='rounded-t-lg'
                    />
                    <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4'>
                      <h1 className='text-lg font-bold text-white'>{getArgumentCategory(category.category_name)}</h1>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

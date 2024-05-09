'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { useRouter } from 'next/navigation';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

type Category = {
  id: number;
  category_name: string;
};

const Main: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://backend.todo-app.workers.dev/api/categories');
        setCategories(response.data.categories);
      } catch (e) {
        console.log('カテゴリーの取得に失敗しました', e);
      }
    };

    fetchCategories();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  const getArgumentCategory = (categoryName: string): string => {
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
        return '???';
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-xl font-bold mb-6 text-center'>メインページ</h1>
          <div className='mb-8'>
            <Slider {...sliderSettings} lazyLoad='ondemand'>
              {categories.map((category) => (
                <div key={category.id} className='px-4'>
                  <button
                    className='bg-white rounded shadow-md overflow-hidden focus:outline-none'
                    onClick={() => router.push(`/category/${encodeURIComponent(category.category_name)}`)}
                  >
                    <Image
                      src={`/categories/${category.id}.jpg`}
                      alt={category.category_name}
                      width={300}
                      height={200}
                      style={{ objectFit: 'cover' }}
                    />
                    <div className='p-4'>
                      <h1 className='text-lg font-bold'>{getArgumentCategory(category.category_name)}</h1>
                    </div>
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;

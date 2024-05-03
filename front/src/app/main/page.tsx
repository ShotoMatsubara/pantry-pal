'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

type Category = {
  id: number;
  category_name: string;
};

const Main: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8787/api/categories');
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
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-xl font-bold mb-6 text-center'>メインページ</h1>
          <div className='mb-8'>
            <Slider {...sliderSettings}>
              {categories.map((category) => (
                <div key={category.id} className='px-4'>
                  <div className='bg-white rounded shadow-md overflow-hidden'>
                    <Image
                      src={`/categories/${category.id}.jpg`}
                      alt={category.category_name}
                      width={300}
                      height={200}
                      objectFit='cover'
                    />
                    <div className='p-4'>
                      <h2 className='text-lg font-bold'>{category.category_name}</h2>
                    </div>
                  </div>
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

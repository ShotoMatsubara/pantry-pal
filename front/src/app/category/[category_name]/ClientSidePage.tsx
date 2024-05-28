'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { getArgumentCategory } from '@/app/main/main';

const ClientSidePage = (props: { categoryName: string }) => {
  const { categoryName } = props;
  const router = useRouter();

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white py-6'>
      <div className='max-w-md mx-auto px-4'>
        <div className='flex justify-start mb-6'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'
            onClick={() => router.push('/main')}
          >
            メインページへ
          </button>
        </div>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-6 text-center text-blue-600'>{getArgumentCategory(categoryName)}一覧</h1>
          <div className='mb-8'>
            {/* 食材一覧を表示するコンポーネントや処理をここに追加 */}
            <p className='text-gray-600'>ここに食材一覧が表示されます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSidePage;

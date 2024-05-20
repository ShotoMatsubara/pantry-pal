'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Activated: React.FC = () => {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-gradient-to-b from-green-100 to-white py-6'>
      <div className='max-w-md mx-auto px-4'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-3xl font-bold mb-6 text-center text-green-600'>登録完了</h1>
          <p className='text-gray-600 mb-8 text-center'>
            ユーザー登録が完了しました！
            <br className='sm:hidden' />
            これで食材の在庫管理アプリケーションを利用できます。
            <br className='sm:hidden' />
            ログインして、効率的な食材管理を始めましょう！
          </p>
          <div className='flex justify-center'>
            <button
              onClick={() => {
                router.push('/main');
              }}
              className='bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline'
            >
              ホーム画面へ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activated;

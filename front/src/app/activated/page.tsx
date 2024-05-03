'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Activated: React.FC = () => {
  const router = useRouter();
  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold mb-6 text-center'>登録完了</h1>
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
                router.push('/home');
              }}
              className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
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

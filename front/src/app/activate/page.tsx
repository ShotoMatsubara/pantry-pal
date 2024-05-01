// コンポーネントがクライアントサイドで動作することを明示する
// React Hooksや状態管理、イベントハンドリングなどのクライアントサイド機能を使用する場合に必要
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import liff from '@line/liff';

const SignupPage: React.FC = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const initializeLiff = async () => {
      await liff.init({ liffId: '2000778309-LkXlYq6j' });
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const user = await liff.getProfile();
        setUserId(user.userId);
      }
    };
    initializeLiff();
  }, []);

  const createUser = () => {
    console.log('レコードが追加されました');
  };

  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold mb-6 text-center'>サインアップ</h1>
          <p className='text-gray-600 mb-8 text-center'>
            このアプリケーションは、食材の在庫を簡単に管理することができます。
            <br className='sm:hidden' />
            購入した食材を登録し、消費期限や在庫数を追跡できます。
            <br className='sm:hidden' />
            食材の無駄を減らし、効率的な食材管理を実現しましょう！
          </p>
          <div className='flex justify-center'>
            <button
              onClick={createUser}
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              登録する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

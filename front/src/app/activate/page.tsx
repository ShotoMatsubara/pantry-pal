// コンポーネントがクライアントサイドで動作することを明示する
// React Hooksや状態管理、イベントハンドリングなどのクライアントサイド機能を使用する場合に必要
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import liff from '@line/liff';

import backendUrl from '@/config/backendUrl';

const Activate: React.FC = () => {
  const liffId = process.env.NEXT_PUBLIC_LIFF_ID;

  const [userId, setUserId] = useState('');
  const router = useRouter();

  useEffect(() => {
    const initializeLiff = async () => {
      if (!!liffId) {
        await liff.init({ liffId: liffId });
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      } else {
        const user = await liff.getProfile();
        setUserId(user.userId);
      }
    };
    initializeLiff();
  }, []);

  const createUser = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/users`, {
        line_user_id: userId,
      });
      router.push('/activated');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white py-6'>
      <div className='max-w-md mx-auto px-4'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>サインアップ</h1>
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
              className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline'
            >
              登録する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activate;

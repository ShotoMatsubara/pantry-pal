'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import liff from '@line/liff';
import axios from 'axios';

import backendUrl from '@/config/backendUrl';

const Authenticate = () => {
  const router = useRouter();
  const liffUrl = process.env.NEXT_PUBLIC_LIFF_ID;

  useEffect(() => {
    const authenticate = async () => {
      if (!!liffUrl) {
        await liff.init({ liffId: liffUrl });
      }

      if (!liff.isLoggedIn()) {
        liff.login();
      }
      const user = await liff.getProfile();
      const lineUserId = user.userId;

      try {
        const response = await axios.post(`${backendUrl}/api/authenticate`, { lineUserId });
        if (response.data.authenticated) {
          // ローカルストレージにuserIdを保存する
          localStorage.setItem('userId', response.data.id);
          // 認証成功の場合は、メインのアプリケーション画面にリダイレクト
          router.push('/main');
        } else {
          // 認証失敗の場合は、サインアップ画面にリダイレクト
          router.push('/activate');
        }
      } catch (error) {
        console.error('認証エラー:', error);
        // エラーハンドリング
      }
    };

    authenticate();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-b from-blue-100 to-white py-6'>
      <div className='max-w-md mx-auto px-4'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-3xl font-bold mb-6 text-center text-blue-600'>認証中</h1>
          <p className='text-gray-600 mb-8 text-center'>
            しばらくお待ちください。
            <br className='sm:hidden' />
            アカウントの認証を行っています。
            <br className='sm:hidden' />
            認証が完了すると、自動的にアプリケーションに移動します。
          </p>
          <div className='flex justify-center'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;

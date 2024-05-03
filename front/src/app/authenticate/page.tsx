'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import liff from '@line/liff';
import axios from 'axios';

const Authenticate = () => {
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      await liff.init({ liffId: '2000778309-LkXlYq6j' });
      if (!liff.isLoggedIn()) {
        liff.login();
      }
      const user = await liff.getProfile();
      const lineUserId = user.userId;

      try {
        const response = await axios.post(`https://backend.todo-app.workers.dev/api/authenticate`, { lineUserId });
        if (response.data.authenticated) {
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
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-3xl font-bold mb-6 text-center'>認証中</h1>
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

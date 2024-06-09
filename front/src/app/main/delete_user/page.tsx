'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import React from 'react';

import { useNotificationContext } from '@/contexts/NotificationContext';

const DeleteUserPage = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
  const { showMessage } = useNotificationContext();
  const router = useRouter();
  const [userId, setUserId] = React.useState<string | null>();

  // ローカルストレージからuser_idを取得する
  React.useEffect(() => {
    // ローカルストレージからuserIdを取得する
    const localUserId = localStorage.getItem('userId') as string | null;
    // ローカルストレージにuserIdがない場合認証画面へ遷移させる。
    !!localUserId ? setUserId(localUserId) : router.push('/authenticate');
  });

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${backendUrl}/api/users/${userId}`);
      if (response.status === 200) {
        showMessage('ユーザーを削除しました', 'success');
        router.push('/authenticate');
      }
    } catch {
      showMessage('ユーザーの削除に失敗しました', 'error');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-red-100 to-white py-6'>
      <div className='max-w-md mx-auto px-4'>
        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h1 className='text-3xl font-bold mb-6 text-center text-red-600'>ユーザーの削除</h1>
          <p className='text-gray-600 mb-8 text-center'>ユーザーを削除しますか？この操作は元に戻せません。</p>
          <div className='flex justify-between'>
            <button
              onClick={() => {
                router.push('/main');
              }}
              className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline'
            >
              キャンセル
            </button>
            <button
              onClick={handleDelete}
              className='bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:shadow-outline'
            >
              削除する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserPage;

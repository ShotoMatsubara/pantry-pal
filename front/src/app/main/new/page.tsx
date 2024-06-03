'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';
import * as React from 'react';

import { Category } from '../page';
import { fetchCategories, getArgumentCategory, fetchQuantityUnits } from '../main';

const NewStockForm = () => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
  const router = useRouter();
  const [categories, setCategories] = React.useState<Category[]>();
  const [quantityUnits, setQuantityUnits] = React.useState<[{ id: number; quantity_unit_name: string }]>();

  // 登録に必要なstate
  const [userId, setUserId] = React.useState<string>();
  const [categoryId, setCategoryId] = React.useState<number>(1);
  const [foodName, setFoodName] = React.useState<string>();
  const [quantityValue, setQuantityValue] = React.useState<number>();
  const [quantityUnitId, setQuantityUnitId] = React.useState<number>(1);
  const [expirationType, setExpirationType] = React.useState<string>('best_before');
  const [expirationDate, setExpirationDate] = React.useState<string>();

  // 必要な値を取得する
  React.useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories(); // fetchCategories関数は非同期関数なのでawaitを用いてPromiseを解決するまで待たせる。
      setCategories(categories);
    };

    const getQuantityUnits = async () => {
      const quantityUnits = await fetchQuantityUnits();
      setQuantityUnits(quantityUnits);
    };
    getCategories();
    getQuantityUnits();

    // ローカルストレージからuserIdを取得する
    const localUserId = localStorage.getItem('userId') as string | null;
    // ローカルストレージにuserIdがない場合認証画面へ遷移させる。
    !!localUserId ? setUserId(localUserId) : router.push('/authenticate');
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = {
      category_id: categoryId,
      food_name: foodName,
      quantity_value: quantityValue,
      quantity_unit_id: quantityUnitId,
      expiration_type: expirationType,
      expiration_date: expirationDate,
    };

    try {
      const response = await axios.post(`${backendUrl}/api/foods`, formData);
      console.log('食材の登録に成功しました');
      router.push('./success');
    } catch (error) {
      console.log('Error:', error);
    }
  };

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
          <h1 className='text-2xl font-bold mb-6 text-center text-blue-600'>食材の追加</h1>
          <div className='mb-8'>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className='mb-4'>
                <label htmlFor='category_id' className='block mb-2 font-bold text-gray-700'>
                  カテゴリー
                </label>
                <select
                  className='ml-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                  id='category_id'
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  value={categoryId}
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {getArgumentCategory(category.category_name)}
                    </option>
                  ))}
                </select>
              </div>
              <div className='mb-4'>
                <label htmlFor='food_name' className='block mb-2 font-bold text-gray-700'>
                  食材名
                </label>
                <input
                  type='text'
                  id='food_name'
                  className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                  onChange={(e) => setFoodName(e.target.value)}
                  placeholder='例: レタス'
                  required
                />
              </div>
              <div className='mb-4'>
                <label htmlFor='quantity_value' className='block mb-2 font-bold text-gray-700'>
                  数量
                </label>
                <div className='flex items-center'>
                  <input
                    type='number'
                    id='quantity_value'
                    className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                    onChange={(e) => setQuantityValue(Number(e.target.value))}
                    placeholder='例: 1'
                    required
                  />
                  <select
                    id='quantity_unit_id'
                    className='ml-2 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                    onChange={(e) => setQuantityUnitId(Number(e.target.value))}
                    value={quantityUnitId}
                  >
                    {quantityUnits?.map((quantityUnit) => (
                      <option key={quantityUnit.id} value={quantityUnit.id}>
                        {quantityUnit.quantity_unit_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='mb-4'>
                <label htmlFor='expiration_type' className='block mb-2 font-bold text-gray-700'>
                  期限種別
                </label>
                <select
                  id='expiration_type'
                  className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                  onChange={(e) => setExpirationType(e.target.value)}
                  value={expirationType}
                >
                  <option value='best_before'>賞味期限</option>
                  <option value='expiration_date'>消費期限</option>
                </select>
              </div>
              <div className='mb-4'>
                <label htmlFor='expiration_date' className='block mb-2 font-bold text-gray-700'>
                  期限日
                </label>
                <input
                  type='date'
                  id='expiration_date'
                  className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                  onChange={(e) => setExpirationDate(e.target.value)}
                  required
                />
              </div>
              <div className='text-center'>
                <button
                  type='submit'
                  className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                >
                  追加する
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStockForm;

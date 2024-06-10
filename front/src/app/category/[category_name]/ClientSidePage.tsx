'use client';

import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getArgumentCategory } from '@/lib/categories';
import { FaEdit, FaTrash } from 'react-icons/fa';

import backendUrl from '@/config/backendUrl';

import EditFoodModal from './EditFoodModal';
import { useNotificationContext } from '@/contexts/NotificationContext';

import { Category } from '@/app/main/page';

type Food = {
  id: number;
  user_id: number;
  category_id: number;
  food_name: string;
  quantity_value: number;
  quantity_unit_id: number;
  expiration_type: 'best_before' | 'expiration_date';
  expiration_date: string | null;
  quantity_unit_name: string;
};

const ClientSidePage = (props: { categoryName: string }) => {
  const { showMessage } = useNotificationContext();
  const router = useRouter();
  const { categoryName } = props;
  const [categoryId, setCategoryId] = React.useState();
  const [quantityUnits, setQuantityUnits] = React.useState();
  const [foods, setFoods] = React.useState<Food[]>();

  // モーダルのステイト
  const [editModalState, setEditModalState] = React.useState<{ isOpen: boolean; foodId: number | null }>({
    isOpen: false,
    foodId: null,
  });

  const fetchFoods = async () => {
    try {
      const localUserId = localStorage.getItem('userId');

      if (localUserId) {
        const parsedUserId = parseInt(localUserId, 10);

        if (categoryId && parsedUserId) {
          const responseFoods = await axios.post(`${backendUrl}/api/foods/get`, {
            user_id: parsedUserId,
            category_id: categoryId,
          });
          setFoods(responseFoods.data);
        }
      } else {
        router.push('/authenticate');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // カテゴリーID、localストレージにあるuser_idを取得する
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // ローカルストレージからuserIdを取得する
        const localUserId = localStorage.getItem('userId');

        if (localUserId) {
          const parsedUserId = parseInt(localUserId, 10);

          // category_idを取得する
          const categoryResult = await axios.get(`${backendUrl}/api/categories`);
          const categories = categoryResult.data.categories;
          const category = categories.find((c: Category) => c.category_name === categoryName);
          setCategoryId(category.id);

          // quantity_unit_idを取得する
          const UnitResult = await axios.get(`${backendUrl}/api/quantity_units`);
          const quantityUnits = UnitResult.data.quantity_units;
          setQuantityUnits(quantityUnits);

          if (category) {
            const parsedCategoryId = category.id;

            // user_idとcategory_idが両方存在する場合にのみ、食材の一覧を取得する
            if (parsedUserId && parsedCategoryId) {
              const responseFoods = await axios.post(`${backendUrl}/api/foods/get`, {
                user_id: parsedUserId,
                category_id: parsedCategoryId,
              });
              setFoods(responseFoods.data);
            }
          }
        } else {
          // ローカルストレージにuserIdがない場合認証画面へ遷移させる。
          router.push('/authenticate');
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [categoryName]);

  const getArgumentExpirationType = (expirationType: string) => {
    return expirationType === 'best_before' ? '賞味期限' : '消費期限';
  };

  const openEditModal = (foodId: number) => {
    setEditModalState({ isOpen: true, foodId: foodId });
  };

  const closeEditModal = () => {
    setEditModalState({ isOpen: false, foodId: null });
  };

  const onDelete = async (foodId: number) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/foods/${foodId}`);
      if (response.status === 200) {
        showMessage('食材を削除しました。', 'success');
        // 削除したら再度食材一覧を取得する。
        fetchFoods();
      } else {
        showMessage(`予期しないステータスコード: ${response.status}`, 'error');
      }
    } catch (error) {
      showMessage(`食材の削除に失敗しました: ${error}`, 'error');
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
          <h1 className='text-2xl font-bold mb-6 text-center text-blue-600'>{getArgumentCategory(categoryName)}一覧</h1>
          <div className='mb-8'>
            {!!foods &&
              foods.map((food) => (
                <div key={food.id} className='flex items-center justify-between mb-4'>
                  <div>
                    <h3 className='text-lg font-semibold'>{food.food_name}</h3>
                    <p className='text-gray-600'>
                      {food.quantity_value}
                      {food.quantity_unit_name ?? ''}
                    </p>
                    <p className='text-gray-600'>
                      {getArgumentExpirationType(food.expiration_type)}: {food.expiration_date}
                    </p>
                  </div>
                  <div>
                    <button
                      className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 mr-2'
                      onClick={() => openEditModal(food.id)}
                    >
                      <FaEdit />
                    </button>
                    {editModalState.isOpen && editModalState.foodId === food.id && (
                      <EditFoodModal
                        foodId={food.id}
                        fetchFoods={fetchFoods}
                        isOpen={editModalState.isOpen}
                        onClose={closeEditModal}
                      />
                    )}
                    <button
                      className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                      onClick={() => onDelete(food.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSidePage;

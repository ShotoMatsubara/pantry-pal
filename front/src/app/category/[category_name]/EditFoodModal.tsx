'use client';

import axios from 'axios';
import * as React from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { fetchCategories, getArgumentCategory, fetchQuantityUnits } from '../../main/main';
import { useNotificationContext } from '../../../contexts/NotificationContext';

import { Category } from '../../main/page';

type Props = {
  foodId: number;
  fetchFoods: () => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
};

const EditFoodModal = (props: Props) => {
  const { showMessage } = useNotificationContext();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_ROOT_URL;
  const [categories, setCategories] = React.useState<Category[]>();
  const [quantityUnits, setQuantityUnits] = React.useState<[{ id: number; quantity_unit_name: string }]>();

  // 登録に必要なstate
  const [categoryId, setCategoryId] = React.useState<number>();
  const [foodName, setFoodName] = React.useState<string>();
  const [quantityValue, setQuantityValue] = React.useState<number>();
  const [quantityUnitId, setQuantityUnitId] = React.useState<number>();
  const [expirationType, setExpirationType] = React.useState<string>();
  const [expirationDate, setExpirationDate] = React.useState<string>();

  const [isShowModal, setIsShowModal] = React.useState<boolean>(false);

  // 必要な値を取得する
  React.useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    const getQuantityUnits = async () => {
      const quantityUnits = await fetchQuantityUnits();
      setQuantityUnits(quantityUnits);
    };

    getCategories();
    getQuantityUnits();

    const fetchFoodData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/foods/${props.foodId}`);
        setCategoryId(response.data.category_id);
        setFoodName(response.data.food_name);
        setQuantityValue(response.data.quantity_value);
        setQuantityUnitId(response.data.quantity_unit_id);
        setExpirationType(response.data.expiration_type);
        setExpirationDate(response.data.expiration_date);

        // 必要なステイトが準備できたらモーダルを表示させる
        setIsShowModal(true);
      } catch (error) {
        console.log('データの取得に失敗しました');
      }
    };
    fetchFoodData();
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
      await axios.put(`${backendUrl}/api/foods/${props.foodId}`, formData);
      showMessage('編集が完了しました', 'success');
      // 食材の変更に成功したら、食材をフェッチしなおす。
      props.fetchFoods();
    } catch (e) {
      // TODO: フローティングメッセージを表示させる。
      showMessage('編集に失敗しました', 'error');
    }
  };

  return (
    isShowModal && (
      <>
        <Transition appear show={props.isOpen}>
          <Dialog as='div' className='relative z-10' onClose={props.onClose}>
            <Transition.Child
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 overflow-y-auto'>
              <div className='flex min-h-full items-center justify-center p-4 text-center'>
                <Transition.Child
                  enter='ease-out duration-300'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='ease-in duration-200'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                    <div className='mt-2'>
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
                            value={foodName}
                            required
                          />
                        </div>
                        <div className='mb-4'>
                          <label htmlFor='quantity_value' className='block mb-2 font-bold text-gray-700'>
                            数量
                          </label>
                          <div className='flex items-center'>
                            <input
                              type='text'
                              id='quantity_value'
                              className='w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none'
                              onChange={(e) => {
                                const value = e.target.value;
                                const numericValue = value.replace(/[^0-9]/g, '');
                                setQuantityValue(numericValue ? Number(numericValue) : undefined);
                              }}
                              placeholder='例: 1'
                              value={quantityValue ?? ''}
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
                            value={expirationDate}
                            required
                          />
                        </div>
                        <div className='text-center'>
                          <button
                            type='submit'
                            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110'
                          >
                            変更する
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className='mt-4'>
                      <button
                        type='button'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                        onClick={props.onClose}
                      >
                        閉じる
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    )
  );
};

export default EditFoodModal;

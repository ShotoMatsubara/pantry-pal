import axios from 'axios';

import backendUrl from '@/config/backendUrl';

// 単位の一覧を取得する
export const fetchQuantityUnits = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/quantity_units`);
    return response.data.quantityUnits;
  } catch (e) {
    console.log('単位の取得に失敗しました', e);
  }
};

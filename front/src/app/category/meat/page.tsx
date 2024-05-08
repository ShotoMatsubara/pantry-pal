const Meat = () => {
  return (
    <div className='min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12'>
      <div className='relative py-3 sm:max-w-xl sm:mx-auto'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl'></div>
        <div className='relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20'>
          <h1 className='text-2xl font-bold mb-6 text-center'>肉の一覧</h1>
          <div className='mb-8'>
            {/* 食材一覧を表示するコンポーネントや処理をここに追加 */}
            <p>ここに食材一覧が表示されます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Meat;

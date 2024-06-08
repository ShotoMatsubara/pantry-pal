import React from 'react';
import { Transition } from '@headlessui/react';
import { useNotificationContext } from '../contexts/NotificationContext';

const Notification = () => {
  const { message, messageType, showNotification } = useNotificationContext();

  return (
    <div
      aria-live='assertive'
      className='fixed inset-0 flex items-start px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50'
    >
      <div className='w-full flex flex-col items-center space-y-4 sm:items-start'>
        <Transition
          show={showNotification}
          enter='transform ease-out duration-300 transition'
          enterFrom='translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2'
          enterTo='translate-y-0 opacity-100 sm:translate-x-0'
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div
            className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${messageType === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
          >
            <div className='p-4'>
              <div className='flex items-start'>
                <div className='flex-shrink-0'>
                  {messageType === 'success' ? (
                    <svg className='h-6 w-6 text-green-400' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
                      <path
                        fillRule='evenodd'
                        d='M10 18a8 8 0 100-16 8 8 0 000 16zm-1-9V5a1 1 0 112 0v4a1 1 0 01-.293.707l-3 3a1 1 0 01-1.414-1.414l3-3A1 1 0 019 9z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg className='h-6 w-6 text-red-400' fill='currentColor' viewBox='0 0 20 20' aria-hidden='true'>
                      <path
                        fillRule='evenodd'
                        d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9 8a1 1 0 012 0v2a1 1 0 01-.293.707l-2 2a1 1 0 01-1.414-1.414l2-2A1 1 0 019 10V8z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
                <div className='ml-3 w-0 flex-1 pt-0.5'>
                  <p className='text-sm font-medium text-gray-900'>{message}</p>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Notification;

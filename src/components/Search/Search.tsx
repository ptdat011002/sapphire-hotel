'use client';

import { useRouter } from 'next/navigation';
import { ChangeEvent, FC, useState } from 'react';

type Props = {
  roomTypeFilter: string;
  searchQuery: string;
  setRoomTypeFilter: (value: string) => void;
  setSearchQuery: (value: string) => void;
};

const Search: FC<Props> = ({
  roomTypeFilter,
  searchQuery,
  setRoomTypeFilter,
  setSearchQuery,
}) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleRoomTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRoomTypeFilter(event.target.value);
  };

  const handleSearchQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const validRegex = /^[a-zA-Z0-9\s]*$/;

    if (!validRegex.test(value)) {
      setErrorMessage('Search query contains invalid characters.');
    } else {
      setErrorMessage('');
    }

    setSearchQuery(value);
  };

  const handleFilterClick = () => {
    if (!errorMessage) {
      router.push(`/rooms?roomType=${roomTypeFilter}&searchQuery=${searchQuery}`);
    }
  };

  return (
    <section className='bg-tertiary-light px-4 py-6 rounded-lg'>
      <div className='container mx-auto flex gap-4 flex-wrap justify-between items-center'>
        <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
          <label className='block text-sm font-medium mb-2 text-black'>
            Room Type
          </label>
          <div className='relative'>
            <select
              value={roomTypeFilter}
              onChange={handleRoomTypeChange}
              className='w-full px-4 py-2 capitalize rounded leading-tight dark:bg-black focus:outline-none'
            >
              <option value='All'>All</option>
              <option value='Basic'>Basic</option>
              <option value='Luxury'>Luxury</option>
              <option value='Suite'>Suite</option>
            </select>
          </div>
        </div>

        <div className='w-full md:1/3 lg:w-auto mb-4 md:mb-0'>
          <label className='block text-sm font-medium mb-2 text-black'>
            Search
          </label>
          <input
            type='search'
            id='search'
            placeholder='Search...'
            className='w-full px-4 py-3 rounded leading-tight dark:bg-black focus:outline-none placeholder:text-black dark:placeholder:text-white'
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
          {errorMessage && (
            <p className='text-red-500 text-sm mt-1'>{errorMessage}</p>
          )}
        </div>

        <button
          className='btn-primary'
          type='button'
          onClick={handleFilterClick}
          disabled={!!errorMessage} // Disable nút nếu có lỗi
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
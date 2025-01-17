'use client';

import Search from 'components/Search/Search';
import { useState } from 'react';


const PageSearch = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Search
      roomTypeFilter={roomTypeFilter}
      searchQuery={searchQuery}

      setRoomTypeFilter={setRoomTypeFilter}
      setSearchQuery={setSearchQuery}

    />
  );
};

export default PageSearch;


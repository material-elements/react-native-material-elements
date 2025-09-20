import React from 'react';
import { Avatar, Box, Pagination } from '../src';

export const Ex1: React.FC = () => {
  return (
    <Box sx={{ f: 1, d: 'flex', content: 'center', items: 'center', gap: 10 }}>
      <Pagination count={10} />
      <Pagination count={10} onPageChange={(_, page) => console.log(page)} />
      <Pagination count={10} activeCount={6} />
      <Pagination count={10} disabled />
      <Pagination count={10} dotStyles={{ backgroundColor: 'red' }} />
      <Pagination
        count={10}
        renderItem={
          <Avatar
            source={{
              uri: 'https://imgs.search.brave.com/PVUfYH0LXpx98boFnkR0syDr25RdoSWaF0paHQfs2ms/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9o/YXBweS1yZWQtaGFp/cmVkLW1hbi10YWtp/bmctc2VsZmllLXBo/b3RvXzEyNjItNTEx/OC5qcGc_c2l6ZT02/MjYmZXh0PWpwZw',
            }}
            size={30}
            variation="rounded"
          />
        }
      />
      <Pagination count={10} style={{ backgroundColor: 'red', borderRadius: 10 }} />
      <Pagination count={10} paginationItemProps={{ shape: 'rounded' }} />
      <Pagination count={10} paginationItemProps={{ shape: 'circular' }} />
      <Pagination count={10} paginationItemProps={{ color: 'error' }} />
      <Pagination count={10} paginationItemProps={{ color: 'primary' }} />
      <Pagination count={10} paginationItemProps={{ color: 'secondary' }} />
      <Pagination count={10} paginationItemProps={{ color: 'gray' }} />
      <Pagination count={10} paginationItemProps={{ variant: 'outlined' }} />
      <Pagination count={10} paginationItemProps={{ rippleBackgroundColor: 'red' }} />
      <Pagination count={10} paginationItemProps={{ disableRipple: true }} />
    </Box>
  );
};

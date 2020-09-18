import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import { useStores } from 'hooks/useStores';
import { SimpleGrid } from '@chakra-ui/core';
import ContentItem from 'components/FolderItem';

export default function ContentBox() {
  const { store } = useStores();

  useEffect(() => {
    store.getDirs();
  }, [store]);

  return useObserver(() => (
    <SimpleGrid
      px={['10px', '10px', '10px', 0]}
      py={'15px'}
      w='100%'
      spacing='4'
      columns={[1, 1, 1, 2]}
    >
      {store.contents.length &&
        store.contents.map(({ name, isDir }) => (
          <ContentItem key={name} isDir={isDir} store={store}>
            {name}
          </ContentItem>
        ))}
    </SimpleGrid>
  ));
}

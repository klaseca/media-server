import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from 'hooks/useStores';
import { SimpleGrid } from '@chakra-ui/core';
import { ContentItem } from 'components/ContentItem';
import { useLocation } from 'react-router-dom';

const _ContentBox = () => {
  const { store } = useStores();
  const { pathname } = useLocation();

  useEffect(() => {
    store.loadContent(pathname);
  }, [store, pathname]);

  return (
    <SimpleGrid
      px={['10px', '10px', '10px', 0]}
      py={'15px'}
      w='100%'
      spacing='4'
      columns={[1, 1, 1, 2]}
    >
      {store.contents.map(({ name, isDir }) => (
        <ContentItem key={name} isDir={isDir} store={store}>
          {name}
        </ContentItem>
      ))}
    </SimpleGrid>
  );
};

export const ContentBox = observer(_ContentBox);

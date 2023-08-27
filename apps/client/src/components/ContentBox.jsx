import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { SimpleGrid } from '@chakra-ui/core';
import { useLocation } from 'react-router-dom';
import { ContentItem } from 'components/ContentItem/ContentItem';
import { useStore } from 'hooks/useStore';
import { useApi } from 'contexts/ApiContext';

const _ContentBox = () => {
  const store = useStore();

  const { pathname } = useLocation();

  const api = useApi();

  useEffect(() => {
    api.loadContent(pathname).then(store.setContents);
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

import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from 'hooks/useStores';
import { SimpleGrid } from '@chakra-ui/core';
import ContentItem from 'components/ContentItem';

const ContentBox = observer(() => {
  const { store } = useStores();

  useEffect(() => {
    store.getDirs();
  }, [store]);

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
});

export default ContentBox;

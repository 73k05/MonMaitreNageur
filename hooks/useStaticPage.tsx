import {useEffect} from 'react';
import {gql, useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';

export const useStaticPage = (name: string) => {
  const navigation = useNavigation();
  const [getContent, {data}] = useLazyQuery(
    gql`
        {
            staticPageContent(staticPageName: "${name}") {
                success
                errorCode
                staticPageContent {
                    content
                    type
                }
            }
        }
    `,
    {
      //fetchPolicy: 'no-cache',
    },
  );

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      getContent();
    });
  }, [navigation, getContent]);

  return {content: data?.staticPageContent?.staticPageContent};
};

export default useStaticPage;

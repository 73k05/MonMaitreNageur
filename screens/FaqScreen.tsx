import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import {AppStatusBar, ConnectedLayout, ListAccordion} from '../components';
import {gql, useLazyQuery} from '@apollo/client';
import {useNavigation} from '@react-navigation/native';
import Screen from '../hocs/Screen';

const FAQ = gql`
  {
    faq {
      success
      errorCode
      faqs {
        question
        answer
      }
    }
  }
`;

export const FaqScreen = Screen(() => {
  const navigation = useNavigation();
  const [getFaq, {data}] = useLazyQuery(FAQ, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      getFaq();
    });
  }, [navigation, getFaq]);

  const faqs = data?.faq?.faqs;

  return (
    <ConnectedLayout back={true} title={'FAQ'}>
      <AppStatusBar transparent />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        {(faqs || []).map((q: any, x: number) => (
          <ListAccordion key={x} question={q.question} answer={q.answer} />
        ))}
      </ScrollView>
    </ConnectedLayout>
  );
});

export default FaqScreen;

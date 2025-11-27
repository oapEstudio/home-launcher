import { Suspense } from 'react';
import { CustomBox } from '../../../../components/ui/box/CustomBox';
import Loading from '../../../../components/ui/loading';
import { useDynamicPage } from './hooks/useDynamicPage';
import { DynamicPage } from '../../shared/components/dynamic-page/DynamicPage';
import Footer from '../../../../components/ui/footer/Footer';

export const DynamicPageTemplate = () => {
  const { hasMenu, loading, pagesProps, isRedirecting } = useDynamicPage();

  if (isRedirecting || loading) {
    return (
      <CustomBox sx={{ py: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', width: '100%' }}>
        <Loading />
      </CustomBox>
    );
  } else {
      return (
        <Suspense fallback={null}>
          <DynamicPage
            isMenu={hasMenu}
            sections={pagesProps}
            isEdit={false}
          />
          {hasMenu && <Footer />}
        </Suspense>
      );
  }
};
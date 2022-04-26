import React, { PropsWithChildren } from 'react';
import Head from 'next/head';
import PageContainer from '../containers/PageContainer';
import TermsPageContainer from '../containers/Terms';

interface ComponentProps {}

const TermsPage: React.FC<PropsWithChildren<ComponentProps>> = ({ children }) => {
    return (
        <>
            <Head>
                <title>Curry Part 2</title>
            </Head>
            <PageContainer>
                <TermsPageContainer />
            </PageContainer>
        </>
    );
};

export default TermsPage;

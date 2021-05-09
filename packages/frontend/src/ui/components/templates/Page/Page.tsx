import styled from 'styled-components';
import React from 'react';
import { Container } from '../../layouts';

interface PageProps {
  children: React.ReactNode;
}
export function Page(props: PageProps) {
  return (
    <PageContainer>
      <Container>{props.children}</Container>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  background: ${props => props.theme.backgroundPrimary};

  width: 100%;
  height: 100vh;
`;

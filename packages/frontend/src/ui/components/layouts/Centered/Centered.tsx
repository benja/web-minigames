import styled from "styled-components";
import React from "react";

interface CenteredProps {
  children: React.ReactNode;
}
export function Centered(props: CenteredProps) {
  return (
    <PageContainer>
      {props.children}
    </PageContainer>
  )
}

const PageContainer = styled.div`
  justify-content: center;
  align-items: center;
  
  width: 100%;
  height: 100vh;
  
  display: flex;
  flex-direction: column;
`;

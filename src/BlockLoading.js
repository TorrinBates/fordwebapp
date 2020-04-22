import React from 'react';
import styled from 'styled-components';
import { Rotate, animateFirst, animateTwo, animateThree, animateFour } from './Animate';
  
  const sizeItem = {
    small: '10px',
    default: '12px',
    large: '14px'
  }
  
  const sizeContainer = {
    small: '24px',
    default: '30px',
    large: '36px'
  }
  
const LoadContainer = styled.div`
  width: ${props => sizeContainer[props.size] || sizeContainer['default'] };
  height: ${props => sizeContainer[props.size] || sizeContainer['default'] };
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  animation: ${Rotate} ${props => props.speed || 8}s infinite ease-in-out;
`;

const Item = styled.div`
  width: ${props => sizeItem[props.size] || sizeItem['default'] };
  height: ${props => sizeItem[props.size] || sizeItem['default'] };
  margin: auto;
`;

const ItemFirst = styled(Item)`
  animation: ${props => animateFirst(props.color || '#00adb5')} ${props => props.speed / 4 || 2}s infinite ease-in-out;
`;

const ItemTwo = styled(Item)`
  animation: ${props => animateTwo(props.color || '#00adb5')} ${props => props.speed / 4 || 2}s infinite ease-in-out;
`;

const ItemThree = styled(Item)`
  animation: ${ props => animateThree(props.color || '#00adb5')} ${props => props.speed / 4 || 2}s infinite ease-in-out;
`;

const ItemFour = styled(Item)`
  animation: ${ props => animateFour(props.color || '#00adb5')} ${props => props.speed / 4 || 2}s infinite ease-in-out;
`;

/*
Spinner component that is used when a car is added
*/
const BlockLoading = ({isHidden, speed, size="default", color }) => {

  // makes the component hidden till the state changes to false
  const style = isHidden ? {margin: 'auto', display: 'none'} : {margin: 'auto'};

  return (
    <LoadContainer style={style} speed={speed} size={size}>
      <ItemFirst speed={speed} size={size} color={color}></ItemFirst>
      <ItemTwo speed={speed} size={size} color={color}></ItemTwo>
      <ItemFour speed={speed} size={size} color={color}></ItemFour>
      <ItemThree speed={speed} size={size} color={color}></ItemThree>
    </LoadContainer>
  );
};

export default BlockLoading;
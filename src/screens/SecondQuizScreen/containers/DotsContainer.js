import React from 'react';

import {
  DotsWrapper,
  UnselectedDot,
  SelectedDot,
} from '../components';


export const DotsContainer = ({ selectedDotIndex }) => {
  const dotList = [
    <UnselectedDot key={0} />,
    <UnselectedDot key={1} />,
    <UnselectedDot key={2} />,
    <UnselectedDot key={3} />,
    <UnselectedDot key={4} />,
    <UnselectedDot key={5} />,
    <UnselectedDot key={6} />,
    <UnselectedDot key={7} />,
    <UnselectedDot key={8} />,
    <UnselectedDot key={9} />,
    <UnselectedDot key={10} />,
  ];

  dotList[selectedDotIndex] = <SelectedDot key={selectedDotIndex} />;

  return (
    <DotsWrapper>
      { dotList.map(dot => dot) }
    </DotsWrapper>
  );
};

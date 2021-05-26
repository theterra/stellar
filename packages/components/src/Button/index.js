import React from 'react';
import styled from '@emotion/styled';
import { space, width, fontSize, color, buttonStyle } from 'styled-system';

const Button = styled('button')`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  ${buttonStyle}
  `;

const _Button = ({ onClick, children, variant }) => {
    return (
        <Button onClick={onClick} variant={variant} fontSize="2">
            {children}
        </Button>
    );
};

export default _Button;

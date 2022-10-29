import React, { Component } from 'react';
import { useState } from 'react';
import { Button } from '@chakra-ui/react'
export const Contador = ({stock, onAdd}) => {
    const [count, setCount] = useState(1);

    const decrease = () => {
        setCount(count - 1);
    }

    const increase = () => {
        setCount(count + 1);
    }


    return (
        <label className='counter'>
            <label>{' '}
                <Button disabled={count <= 1} onClick={decrease}>-</Button>{' '}
            </label>
            <label>{' '}
                <Button disabled={count >= 16} onClick={increase}>+</Button>{' '}
            </label>
            <label>{' '}
                <Button onClick={() => onAdd(count)}>OK</Button>{' '}
            </label>
            <span>{count}</span>
        </label>
    );
}
export default Contador;

import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';

const EndScene = () => {
    const { completed, setCompleted} = useContext(StateContext);
    const { setMount } = useContext(StateContext);

    return(
        <>
        {completed ? (
            <>
            WINNNERRRR
            <br/>
            <Button onClick={() => {
                setMount(true); 
                setCompleted(false);
                }}>RESTART
            </Button>
            </>
        ):(
            <></>
        )}
        </>
    )
};

export default EndScene;
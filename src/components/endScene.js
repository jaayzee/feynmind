import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';
import '../css/globalStyles.css';

const EndScene = () => {
    const { completed, setCompleted} = useContext(StateContext);
    const { setMount } = useContext(StateContext);

    return(
        <>
        {completed ? (
            <>
            Good Job! Remember To Summarize What You've Learned!
            <br/>
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
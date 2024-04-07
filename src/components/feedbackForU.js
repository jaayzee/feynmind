import React, { useEffect, useState, Children, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';

const FeedbackForU = () => {
    const { answer, setAnswer } = useContext(StateContext);

    return(
        <>
        {answer}
        </>
    )
};

export default FeedbackForU;
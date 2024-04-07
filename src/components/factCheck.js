import React, { useEffect, useState, Children, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';

const FactCheck= () => {
    const { info } = useContext(StateContext);
    const { method } = useContext(StateContext);

    if (method == 'text' || method == 'speech') {
        if (method == 'text') {
            return (
                <Container>
                    <Form.Control
                        type="text"
                        placeholder="subject" 
                        //   onChange = {(e) => setText(e.target.value)}
                        //   onKeyDown={handleText}
                    />
                </Container>
            )
            
        }
    } else {
        return(
            <>
            </>
        )
    }
};

export default FactCheck;
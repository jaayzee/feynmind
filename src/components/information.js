import React, { useEffect, useState, Children } from "react";
import { Container, Button, Form } from "react-bootstrap";

const Information = ( {search, setSearch }) => {
    const [information, setInformation] = useState('');
    useEffect (() =>  {
        setInformation('I am a ' + search);
    }, [search])
    return(
        <>
            {information}
        </>
    )
};

export default Information;
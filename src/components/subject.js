import Information from '../components/information';
import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";


const Subject = () => {
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [mount, setMount] = useState(true)

  const handleText = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        setSearch(text);
        setMount(false);
    }
  };
  const handleButtonClick = () => {
    setSearch(text);
    setMount(false);
  };
  return (
    <>
        { mount ? 
            (<Container>
            I want to learn { }
            <Form.Control
                type="text"
                placeholder="subject" 
                onChange = {(e) => setText(e.target.value)}
                onKeyDown={handleText}
            />
            <Button onClick={handleButtonClick}>Feynman Me Up</Button>
            <p>You entered: {search}</p>
            </Container>)
            : (<></>)}
            <Information search={search} setSearch={setSearch}/>
    </>
    
  );
};

export default Subject;
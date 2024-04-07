import React, { useState, useEffect } from "react";
import { Container, Button, Form } from "react-bootstrap";
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser:true, // This is the default and can be omitted
});

const informationBroker = async (inputData) => {
  const chatCompletion = await openai.chat.completions.create({
      messages: [
          {
              role: "system",
              content: "You are a helpful assistant that outputs JSON files."
          },
          { 
              role: "system", 
              content: "Generate a list of subtopics for the main topic " + inputData + ". For each subtopic, generate a detailed answer."
          },
          ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    
  })
  const answer = (JSON.parse(chatCompletion.choices[0].message.content))
  return answer;
};

const Subject = () => {
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [mount, setMount] = useState(true);
  const [information, setInformation] = useState();
  const [method, setMethod] = useState('');

  useEffect(() => {
    if (!mount) {
      const fetchInformation = async () => {
        const info = await informationBroker(search);
        setInformation(info);
      };

      fetchInformation();
    }
  }, [search, mount]);
  const handleText = async(e) => {
    if (e.key === 'Enter' && text != '') {
        e.preventDefault();
        setSearch(text);
        setMount(false);
    }
  };

  const handleButtonClick = async() => {
    if (text != '') {
      setSearch(text);
      setMount(false);
    }
  };

  const handleChoice = (inputString) => {
    setMethod(inputString)
  }

  return (
    <>
        { mount ? 
            (<Container>
            I want to learn {}
            <Form.Control
                type="text"
                placeholder="subject" 
                onChange = {(e) => setText(e.target.value)}
                onKeyDown={handleText}
            />
            <Button onClick={handleButtonClick}>Feynman Me Up</Button>
            <p>You entered: {search}</p>
            </Container>)
            : (<>
            Would you like to review with {}
            <Button
            onClick={() => handleChoice('text')}>text</Button> or <Button
            onClick={() => handleChoice('speech')}>speech</Button>?
            </>)}
    </>
    
  );
};

export default Subject;
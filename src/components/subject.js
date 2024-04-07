import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';
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
  const answer = (chatCompletion.choices[0].message.content) // add JSON.parse
  return answer;
};

const Subject = () => {
  const { setInfo } = useContext(StateContext);
  const { setMethod } = useContext(StateContext);
  const [search, setSearch] = useState('');
  const [text, setText] = useState('');
  const [mount, setMount] = useState(true);
  const [methodMount, setMethodMount] = useState(true);

  useEffect(() => {
    if (!mount) {
      const fetchInformation = async () => {
        const data = await informationBroker(search);
        setInfo(data);
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
    setMethod(inputString);
    setMethodMount(false);
  }

  return (
    <>
        { mount ? 
            (
            <Container>
              I want to learn about {}
              <Form.Control
                  type="text"
                  placeholder="subject" 
                  onChange = {(e) => setText(e.target.value)}
                  onKeyDown={handleText}
              />
              <Button onClick={handleButtonClick}>Feynman Me Up</Button>
              <p>You entered: {search}</p>
            </Container>
            )
            : (<>
                { methodMount ? 
                  (<>
                    Would you like to review with {}
                    <Button
                    onClick={() => handleChoice('text')}>text</Button> or <Button
                    onClick={() => handleChoice('speech')}>speech</Button>?
                    </>
                  )
                  : 
                  (<></>)
                }
            </>)
        }
    </>
    
  );
};

export default Subject;
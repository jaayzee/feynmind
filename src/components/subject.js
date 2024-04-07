import React, { useState, useEffect, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';
import OpenAI from 'openai'
import '../css/globalStyles.css';
import { isElementType } from "@testing-library/user-event/dist/utils";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser:true, // This is the default and can be omitted
});

const informationBroker = async (model, inputData) => {
  const chatCompletion = await model.chat.completions.create({
      messages: [
          {
              role: "system",
              content: "You are a helpful assistant that outputs JSON files."
          },
          { 
              role: "system", 
              content: `Generate a list of subtopics for the main topic `+ inputData +` and their detailed answers. Include the properties, “name”, and “answer” ONLY. 
              “name” -  create the subtopic name or title
              “answer” - generate a detailed answer to the corresponding subtopic name or title.`
          },
          ],
      model: "gpt-3.5-turbo-0125",
      response_format: { type: "json_object" },
    
  })
  const answer = (JSON.parse(chatCompletion.choices[0].message.content)) // add JSON.parse
  return answer;
};

const Subject = () => {
  const { setInfo } = useContext(StateContext);
  const { setMethod } = useContext(StateContext);
  const { openAI } = useContext(StateContext);
  const { mount, setMount } = useContext(StateContext);
  const { methodMount, setMethodMount } = useContext(StateContext);
  
  const { search, setSearch } = useContext(StateContext);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!mount) {
      const fetchInformation = async () => {
        const data = await informationBroker(openAI, search);
        setInfo(data);
      };

      fetchInformation();
    }
  }, [search, mount]);

  const handleText = async(e) => {
    setTyping(true);
    if (e.key === 'Enter' && text != '') {
        e.preventDefault();
        setSearch(text);
        setMount(false);
        setMethodMount(true);
    }
  };

  const handleKeyUp = () => {
    setTyping(false);
  }

  const handleButtonClick = async() => {
    if (text != '') {
      setSearch(text);
      setMount(false);
      setMethodMount(true);
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
            <Container className="block">
              I want to learn about {}
              <Form.Control
                className={`${typing ? 'move-down' : 'move-up' }`}
                type="text"
                placeholder="subject" 
                onChange = {(e) => setText(e.target.value)}
                onKeyDown={handleText}
                onKeyUp={handleKeyUp}
              />
              {} {}
              <Button onClick={handleButtonClick}>Feynman Me Up</Button>
            </Container>
            )
            : (<></>)
        }
        { methodMount ? 
                  (<div className="block">
                    Would you like to review with {}
                    <Button
                    onClick={() => handleChoice('text')}>text</Button> or <Button
                    onClick={() => handleChoice('speech')}>speech</Button>?
                    </div>
                  )
                  : 
                  (<></>)
        }
    </>
    
  );
};

export default Subject;
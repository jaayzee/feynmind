import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';
import '../css/globalStyles.css';

const FactCheck = () => {
    const { search } = useContext(StateContext);
    const { info } = useContext(StateContext);
    const { method } = useContext(StateContext);
    const { openAI } = useContext(StateContext);
    const { answer, setAnswer } = useContext(StateContext);
    const { reviewMount, setReviewMount } = useContext(StateContext);
    const { currName, setCurrName } = useContext(StateContext);
    const { currInfo, setCurrInfo } = useContext(StateContext);
    const { topicsArray, setTopicsArray} = useContext(StateContext);
    const { ready, setReady } = useContext(StateContext);

    const [text, setText] = useState('');
    const [typing, setTyping] = useState(false);

    const temp = [];
    useEffect(() => {
        if (info) {
            info.subtopics.forEach(sub => {
                temp.push(sub);
            })
            if (temp) {
                setTopicsArray(temp);
            }
            setReady(true);
        }
    },[info])

    useEffect(() => {
        if(topicsArray.length > 0){
            setCurrName(topicsArray[0].name);
            setCurrInfo(topicsArray[0].answer);
            setReviewMount(true);
        }
    }, [topicsArray])
    
    const handleButtonClick = () => {
        if (text !== '') {
            setAnswer(text);
            setReviewMount(false);
        } else if (transcription !== '') {
            setAnswer(transcription);
            setReviewMount(false);
        } else {
            console.log("no input");
        }
    };

    /////////////////////////////////////////////////////////
    // Audio Analysis
    const [transcription, setTranscription] = useState("");
    let recognition = null;

    const startTranscription = () => {
        recognition = new window.webkitSpeechRecognition(); // Initialize speech recognition

        recognition.lang = "en-US"; // Set language to English (United States)

        recognition.onresult = event => {
            const transcript = event.results[0][0].transcript; // Get transcription
            setTranscription(transcript);
        };

        recognition.onerror = event => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
        };

        recognition.start(); // Start speech recognition
    };

    const stopTranscription = () => {
        if (recognition) {
            recognition.stop(); // Stop speech recognition
        }
    };

    const handleKeyDown = () => {
        setTyping(true);
      }

    const handleKeyUp = () => {
        setTyping(false);
      }

    if (method == 'text' || method == 'speech') {
        if (method == 'text') {
            return (<> 
                {reviewMount && ready ? 
                (
                    <div className="wrapper">
                    <Container className="stack">
                        <h3>{search}</h3>
                        Explain {currName} {}
                        <br/>
                        <Form.Control
                            className={`${typing ? 'move-down' : 'move-up' }`}
                            as="textarea" aria-label="With textarea" 
                            onChange = {(e) => setText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            onKeyUp={handleKeyUp}
                        />
                        <br/>
                        <Button 
                            onClick={() => {
                            handleButtonClick(); 
                            setReady(false);
                            }}>I'm Done</Button>
                    </Container>
                    </div>
                ) 
                : 
                (<></>)
                }</>
            )
        } else {
            return (
                <>
                {reviewMount && ready ? 
                    (
                        <Container className="stack">
                            <p>{search}</p>
                            Explain {currName} {}
                            <br/>
                            <Button onClick={startTranscription}>Start Transcription</Button>
                            <Button onClick={stopTranscription}>Stop Transcription</Button>
                            {transcription && (
                            <div>
                                <h3>Transcription:</h3>
                                <p>{transcription}</p>
                                <br/>
                                <Button 
                                    onClick={() => {
                                    handleButtonClick(); 
                                    setReady(false);
                                }}>I'm Done</Button>
                            </div>)}
                        </Container>
                    )
                    :
                    (<></>) 
                }
                </>
            );        
        }
    } else {
        return(<></>)
    }
};

export default FactCheck;
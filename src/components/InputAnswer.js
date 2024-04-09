import React, { useEffect, useState, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';
import '../css/globalStyles.css';

const InputAnswer = () => {
    const { topic } = useContext(StateContext);
    const { info } = useContext(StateContext);
    const { method } = useContext(StateContext);
    const { setAnswer } = useContext(StateContext);
    const { reviewMount, setReviewMount } = useContext(StateContext);
    //const { currName, setCurrName } = useContext(StateContext);
    //const { currInfo, setCurrInfo } = useContext(StateContext);
    const { currObj, setCurrObj } = useContext(StateContext);
    const { topicsArray, setTopicsArray} = useContext(StateContext);
    const { ready, setReady } = useContext(StateContext);
    const [text, setText] = useState('');
    const [recognizing, setRecognizing] = useState(false);
    const [typing, setTyping] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionSvc = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new recognitionSvc(); // Initialize speech recognition
    recognition.lang = "en-US"; // Set language to English (United States)

    useEffect(() => {
        const temp = [];
        if (info) {
            info.subtopics.forEach(sub => {
                temp.push(sub);
            })
            if (temp) {
                setTopicsArray(temp);
                setCurrObj(temp[0])
            }
            setReady(true);
        }
    },[info])

    useEffect(() => {
        if(topicsArray.length > 0){
            setCurrObj(topicsArray[0])
            setReviewMount(true);
        }
    }, [topicsArray])
    
    const handleButtonClick = () => {
        if (text !== '') {
            setAnswer(text);
            setReviewMount(false);
            setTranscript('');
        } else if (transcript !== '') {
            setAnswer(transcript);
            setReviewMount(false);
            setTranscript('');
        } else {
            console.log("no input");
        }
    };

    const handleText = async(e) => {
        setTyping(true);
        if (e.key === 'Enter') {
            if (text !== '') {
                setAnswer(text);
                setReviewMount(false);
            } else if (transcript !== '') {
                setAnswer(transcript);
                setReviewMount(false);
            } else {
                console.log("no input");
            }
        }
      };

    /////////////////////////////////////////////////////////
    // Audio Analysis

    const startTranscription = () => {
        recognition.onresult = event => {
            var currentTranscript = transcript;
            for(var i = event.resultIndex; i < event.results.length; i++){
                currentTranscript += event.results[i][0].transcript;
            }
            setTranscript(currentTranscript)
        };
        recognition.onerror = event => {
            console.error("Speech recognition error:", event.error);
        };
        recognition.onend = () => {
            console.log("Speech recognition ended");
        };
        recognition.start();
        setRecognizing(true)
    };

    const stopTranscription = () => {
        if (recognizing){
            recognition.stop(); // Stop speech recognition
            setRecognizing(false)
        }
        
    };

    const handleKeyUp = () => {
        setTyping(false);
    }

    if (method === 'text' || method === 'speech') {
        if (method === 'text') {
            return (<> 
                {reviewMount && ready ? 
                (
                    <div className="wrapper">
                    <Container className="stack">
                        <h3>{topic}</h3>
                        Explain {currObj.name} {}
                        <br/>
                        <Form.Control
                            className={`${typing ? 'move-down' : 'move-up' }`}
                            as="textarea" aria-label="With textarea" 
                            placeholder="Start typing..."
                            onChange = {(e) => setText(e.target.value)}
                            onKeyDown={handleText}
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
                            <p>{topic}</p>
                            Explain {currObj.name} {}
                            <br/>
                            <Button onClick={startTranscription}>Start Recording</Button>
                            <Button onClick={stopTranscription}>Stop Recording</Button>
                            {transcript && (
                            <div>
                                <h3>Transcription:</h3>
                                <p>{transcript}</p>
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

export default InputAnswer;
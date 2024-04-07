import React, { useEffect, useState, Children, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import { useReactMediaRecorder } from "react-media-recorder";
import StateContext from '../StateContext';

async function blobUrlToWavObject(blobUrl) {
    // Fetch the Blob data
    const response = await fetch(blobUrl);
    const blob = await response.blob();

    // Create a new AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Read the Blob data as an ArrayBuffer
    const arrayBuffer = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsArrayBuffer(blob);
    });

    // Decode the ArrayBuffer to an AudioBuffer
    const audioBuffer = await new Promise((resolve, reject) => {
        audioContext.decodeAudioData(arrayBuffer, resolve, reject);
    });

    return audioBuffer;
}

const FactCheck= () => {
    const { info } = useContext(StateContext);
    const { method } = useContext(StateContext);
    const { openAI } = useContext(StateContext);
    const { answer, setAnswer } = useContext(StateContext);

    const [mount, setMount] = useState(true);
    const [text, setText] = useState('');
    const [topic, setTopic] = useState('piss');
    // const [recording, setRecording] = useState();


    // const transcribeAudio = async (ai, audio) => {
    //     try {
    //         console.log(audio);
    //         const transcription = await ai.audio.transcriptions.create({
    //             file: audio,
    //             model: "whisper-1",
    //             response_format: "text",
    //         });

    //         console.log("Transcription:", transcription.text);
    //     } catch (error) {
    //         console.error("Error transcribing audio:", error);
    //     }
    // };
        


    // const { startRecording, stopRecording, mediaBlobUrl } =
    // useReactMediaRecorder({ audio : true });

    // const handleStopRecording = async () => {
    //     if (mediaBlobUrl) {
    //         blobUrlToWavObject(mediaBlobUrl)
    //         .then((wavObject) => {
    //             console.log(typeof(wavObject))
    //             transcribeAudio(openAI, wavObject); // This is the AudioBuffer object
    //         })
    //         .catch((error) => {
    //             console.error('Error converting blob to WAV object:', error);
    //         });
    //         await transcribeAudio(openAI, mediaBlobUrl);
    //     }
    // }
    
    const handleButtonClick = async() => {
        if (text != '') {
          setAnswer(text);
          setMount(false);
        }
      };

    if (method == 'text' || method == 'speech') {
        if (method == 'text') {
            return (<> 
                {mount ? 
                (
                    <Container>
                        What do you know about {topic}
                        <Form.Control
                            as="textarea" aria-label="With textarea" 
                            onChange = {(e) => setText(e.target.value)}
                        />
                        <Button onClick={handleButtonClick}>I'm Done</Button>
                    </Container>
                ) 
                : 
                (<></>)
                }</>
                
            )
        } else {
            return (
                <div>
                {/* <Button onClick={startRecording}>Start Recording</Button>
                <Button onClick={() => { stopRecording(); handleStopRecording();  }}>
                        Stop Recording and Transcribe
                </Button>
                {mediaBlobUrl && (
                    <audio controls src={mediaBlobUrl}></audio>
                  )} */}
                </div>
            );        
        }
    } else {
        return(
            <>
            </>
        )
    }
};

export default FactCheck;
import React, { useEffect, useState, useContext } from "react";
import { Button } from "react-bootstrap";
import StateContext from '../StateContext';
import '../css/globalStyles.css';

const generateResponse = async (model, subtopic, baseAnswer, givenAnswer) => {
    const chatResponse = await model.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that outputs JSON files"
            },
            {
                role: "system",
                content: `Compare these two descriptions for the subtopic: `+ subtopic +`: Base answer: `+ baseAnswer +` Given answer: `+ givenAnswer + `For
                 the comparison, write the properties “clarity”, “correctness”, “feedback”, and “passing” for how the given answer compares to the base answer ONLY.
                “Clarity” - give a rating on the given answer’s clarity with low, medium or high in comparison to the base answer
                “Correctness” - give a rating on the given answer’s correctness with low, medium or high in comparison to the base answer
                “Feedback” - give any useful critiques on how to improve the given answer to better match the base answer
                “Passing” - give a true or false on if the given answer is sufficient to the understanding of the subtopic based upon the "clarity" and "correctness" score,
                For example, a low clarity score and low correctness score will return a false passing, while a high clarity and high correctness will return true for passing.`
            },
        ],

        model: "gpt-3.5-turbo-0125",
        response_format: {type : "json_object"},
    })

    const response = (JSON.parse(chatResponse.choices[0].message.content));
    return response;
}

const GenFeedback = () => {
    const { answer } = useContext(StateContext);
    const { openAI } = useContext(StateContext);
    const { currObj, setCurrObj } = useContext(StateContext);
    const { reviewMount, setReviewMount } = useContext(StateContext);
    const { topicsArray, setTopicsArray} = useContext(StateContext);
    const { setReady } = useContext(StateContext);
    const { setCompleted} = useContext(StateContext);
    
    const [review, setReview] = useState('');
    const [continueMount, setContinueMount] = useState(false);
    const [ prevObj, setPrevObj ] = useState();

    useEffect(() => {
        if(!reviewMount){
            const fetchReview = async () => {
                const result = await generateResponse(openAI, currObj.name, currObj.answer, answer);
                setReview(result);
            };
        
            fetchReview();
        }
    }, [answer])

    useEffect(() => {
        if(review.feedback) {
            let temp = [];
            setContinueMount(true);
            if (!review.passing) {
                temp = topicsArray;
                temp.push(temp.shift());
                setTopicsArray(temp);
                setPrevObj(currObj)
                setCurrObj(topicsArray[0])
            } else {
                // If last array element, move toward end screen
                if (topicsArray.length === 1) {
                    setCompleted(true);
                    setContinueMount(false);
                } else {
                    temp = topicsArray;
                    temp.shift();
                    setTopicsArray(temp);
                    setPrevObj(currObj)
                    setCurrObj(topicsArray[0])
                }
            }
        }
    }, [review])

    console.log(topicsArray);
    return(
        <div className="wrapper-sides">
        { continueMount ? 
            (<div className="stack">
                <b>Feedback: </b> {review.feedback}
                <br/>
                <b>Clarity: </b> {review.clarity}
                <br/>
                <b>Correctness: </b> {review.correctness}
                <br/>
                <b>Passing: </b> {review.passing ? ("TRUE") : ("FALSE")}
                {
                !review.passing ? (
                    <>
                        <br/>
                        <b>Study Up: </b> {prevObj.answer}
                    </>
                ) : (<></>)
                }
                <br/>
                <br/>
                <br/>
                <Button onClick={() => {
                    setContinueMount(false); 
                    setReviewMount(true);
                    setReady(true);
                    }}> Continue </Button>
            </div>): (<></>)
        }
        </div>
    )
};

export default GenFeedback;
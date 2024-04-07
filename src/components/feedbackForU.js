import React, { useEffect, useState, Children, useContext } from "react";
import { Container, Button, Form } from "react-bootstrap";
import StateContext from '../StateContext';

const generateResponse = async (model, search, info, answer) => {
    const chatResponse = await model.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a helpful assistant that outputs JSON files"
            },
            {
                role: "system",
                content: `Compare these two descriptions for the subtopic: `+ search +`: Base answer: `+ info +` Given answer: `+ answer + `For
                 the comparison, write the properties “clarity”, “correctness”, “feedback”, and “passing” for how the given answer compares to the base answer ONLY.
                “Clarity” - give a rating on the given answer’s clarity with low, medium or high in comparison to the base answer
                “Correctness” - give a rating on the given answer’s correctness with low, medium or high in comparison to the base answer
                “Feedback” - give any useful critiques on how to improve the given answer to better match the base answer
                “Passing” - give a true or false on if the given answer is sufficient to the understanding of the subtopic.`
            },
        ],
        //{ "baseAnswer": { "description": "Italian culture involves various aspects such as art, food, fashion, and music. It is known for its rich history, famous landmarks, and traditional values." }, "clarity": "low", "correctness": "low", "feedback": "The given answer is not clear and lacks depth compared to the base answer. It only touches on a few food items like pasta, spaghetti, and meatballs without providing a comprehensive view of Italian culture.", "passing": false }
        model: "gpt-3.5-turbo-0125",
        response_format: {type : "json_object"},
    })

    const response = (JSON.parse(chatResponse.choices[0].message.content));
    return response;
}

const FeedbackForU = () => {
    const { search } = useContext(StateContext);
    const { answer } = useContext(StateContext);
    const { openAI } = useContext(StateContext);
    const { info } = useContext(StateContext);
    const { currInfo, setCurrInfo } = useContext(StateContext);
    const { currName, setCurrName } = useContext(StateContext);
    const { reviewMount, setReviewMount } = useContext(StateContext);
    const { topicsArray, setTopicsArray} = useContext(StateContext);
    const { ready, setReady } = useContext(StateContext);
    const { completed, setCompleted} = useContext(StateContext);
    
    const [review, setReview] = useState('');
    const [continueMount, setContinueMount] = useState(false);

    useEffect(() => {
        if(!reviewMount){
            const fetchReview = async () => {
                const result = await generateResponse(openAI, search, currInfo, answer);
                setReview(result);
            };
        
            fetchReview();
        }
    }, [answer])

    let temp = [];
    useEffect(() => {
        if(review.feedback) {
            setContinueMount(true);
            if (!review.passing) {
                temp = topicsArray;
                temp.push(temp.shift());
                setTopicsArray(temp);
                setCurrName(topicsArray[0].name);
                setCurrInfo(topicsArray[0].answer);
            } else {
                if (topicsArray.length == 1) {
                    setCompleted(true);
                    setContinueMount(false);
                } else {
                    temp = topicsArray;
                    temp.shift();
                    setTopicsArray(temp);
                    setCurrName(topicsArray[0].name);
                    setCurrInfo(topicsArray[0].answer);
                }
            }
        }
    }, [review])

    console.log(topicsArray);
    return(
        <>
        { continueMount ? 
            (<>
                Feedback: {review.feedback}
                <br/>
                Clarity: {review.clarity}
                <br/>
                Correctness: {review.correctness}
                <br/>
                Passing: {review.passing ? ("TRUE") : ("FALSE")}
                {
                !review.passing ? (
                    <>
                        <br/>
                        Study Up: {currInfo}
                    </>
                ) : (<></>)
                }
                <br/>
                <Button onClick={() => {
                    setContinueMount(false); 
                    setReviewMount(true);
                    setReady(true);
                    }}> Continue </Button>
            </>): (<></>)
        }
        </>
    )
};

export default FeedbackForU;
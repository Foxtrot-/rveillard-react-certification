import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import QuizInit from '../QuizInit/QuizInit';
import { Question, toQuestion } from '../../types/quiz';
import { getQuestions } from '../../api/opendb';
import QuizQuestion from '../QuizQuestion/QuizQuestion';

/**
 * Container component to display the Quiz page with quiz creation and questions to answer.
 */
const Quiz = () => {
    let [questions, setQuestions] = useState<Question[]>([]);
    let [hasAnsweredAll, setAnsweredAll] = useState(false);

    // Keep state used to show/hide submit button up to date, depending on answered questions
    useEffect(() => {
        setAnsweredAll(questions.every(question => !!question.selectedAnswer));
    }, [questions])

    /**
     * Retrieve questions once Category and Difficulty are selected and submitted.
     * @param category Selected category
     * @param difficulty Selected difficulty
     */
    const onInitSubmit = (category: number | undefined, difficulty: string) => {
        // If one of the parameters is missing, do nothing.
        if (!category || !difficulty) {
            return;
        }
        getQuestions(category, difficulty).then(response => {
            setQuestions(response.data.results.map(toQuestion));
        })
        // TODO handle ERR
    }

    /**
     * Update questions state when an answer has been selected.
     * @param questionToUpdate Question that has changed and needs to be updated in state
     */
    const handleAnswerSelection = (questionToUpdate: Question) => {
        setQuestions(
            questions.map(question => {
                if (question.question === questionToUpdate.question) return questionToUpdate;
                return question;
            })
        )
    }

    return (
        <Card className='m-auto' >
            <Card.Body>
                <Card.Title className='text-center mb-5'>Quiz Maker</Card.Title>
                    <QuizInit onSubmit={onInitSubmit} />
                    { !!questions?.length && 
                    <>
                        {questions.map((question, index) => 
                            <QuizQuestion key={index}
                                question={question} 
                                onSelect={handleAnswerSelection}/>
                        )}
                        <Link to="/results" state={{ questions: questions }}>
                            <Button className='mt-3 w-100' hidden={!hasAnsweredAll}>Submit answers</Button>
                        </Link>
                    </>
                    }
            </Card.Body>
            </Card>
    );
}

export default Quiz;
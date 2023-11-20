import { useEffect, useState } from 'react';
import { Card, ProgressBar, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Question } from '../../types/quiz';
import QuizQuestion from '../QuizQuestion/QuizQuestion';

/**
 * Container component to display the result of the quiz along with a colored label for the final score.
 */
const QuizResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let [questions, setQuestions] = useState<Question[]>([]);

    useEffect(() => {
        // In case this component is accessed without necessary data, redirect to root
        if (!location?.state?.questions.length) {
            navigate("/");
        }
        // Save data passed through route
        setQuestions(location?.state?.questions);
    }, [navigate, location])

    /**
     * Compute the number of correct answers from state
     * @returns Number of correct answers 
     */
    const countCorrectAnswers = () : number => {
        return questions?.filter((question) => question.correctAnswer === question.selectedAnswer).length;
    }

    /**
     * Compute the variant associated to the number of correct answers :
     * - `danger` if <= 1 correct answer
     * - `warning` if <= 3 correct answers
     * - `success` otherwise
     * @returns className, one of [`danger`, `warning` `success`]
     */
    const getResultsVariant = () : string => {
        const correctAnswers = countCorrectAnswers();

        if (correctAnswers <= 1) return "danger";
        if (correctAnswers <= 3) return "warning";

        return "success";
    }

    /**
     * Compute the score label
     * @returns Label for the final score
     */
    const getResultLabel = () : string => {
        return `You scored ${countCorrectAnswers()} out of ${questions.length}`;
    }

    return (
        <Card className='m-auto' >
            <Card.Body>
                <Card.Title className='text-center mb-5'>Results</Card.Title>
                    { !!questions.length && 
                    <>
                        {questions.map((question, index) => 
                            <QuizQuestion key={index}
                                question={question} 
                                correctionMode />
                        )}

                        <ProgressBar 
                            className='w-50 m-auto mt-5 mb-3' 
                            variant={getResultsVariant()} 
                            now={100}
                            label={getResultLabel()}
                            />

                        <Link to="/">
                            <Button variant='secondary' className='mt-3 w-100'>Create a new quiz</Button>
                        </Link>
                    </>
                    }
            </Card.Body>
            </Card>
    );
}

export default QuizResults;
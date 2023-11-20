import { Form, Button } from 'react-bootstrap';
import { decode } from 'html-entities';
import { Question } from '../../types/quiz';
import "./QuizQuestion.css"

/** Type interface of props available for `QuizQuestion` component */
interface QuizQuestionProps {
    question: Question;
    onSelect?: (question: Question) => void;
    correctionMode?: boolean;
}

/**
 * Presentational component to display a question with its label, possible answers and selected one if any, and correct answers (in `correctionMode` only).
 */
const QuizQuestion: React.FC<QuizQuestionProps> = ({question, onSelect, correctionMode=false}: QuizQuestionProps) => {

    /**
     * Compute variant for button:
     * - In `correctionMode`,
     *   - `danger` for NOT selected correct answer
     *   - `success` for selected correct answer
     * - `outline-success` otherwise.
     * @param answer The answer associated to the button
     */
    const getButtonVariant = (answer: string) : string => {
        if (correctionMode) {
            if (isCorrectAnswer(answer) && !isSelectedAnswer(answer)) {
                return "danger";
            }
            else if (isSelectedAnswer(answer)) {
                return "success";
            }
        };

        return "outline-success";
    }

    /** Compute if given answer is selected */
    const isSelectedAnswer = (answer: string) : boolean => answer === question.selectedAnswer;
    /** Compute if given answer is correct */
    const isCorrectAnswer = (answer: string) : boolean => answer === question.correctAnswer;

    /** 
     * Handler for `onClick` event on answer button.  
     * Triggers the `onSelect` function passed in props if any 
     */
    const handleSelect = (answer: string) : void => {
        if (onSelect) {
            onSelect({...question, selectedAnswer: answer});
        }
    }
    
    return (
        <Form.Group className="mb-3 text-left" controlId="exampleForm.ControlInput1">
            <Form.Label>{decode(question.question)}</Form.Label>
            <br/>
            {question.answers.map((answer, index) => 
                <>
                    <Button variant={getButtonVariant(answer)}
                        key={index}
                        active={!correctionMode && answer === question.selectedAnswer}
                        onClick={() => handleSelect(answer)}
                        disabled={correctionMode}
                        >{decode(answer)}</Button>{' '}
                </>
            )}
        </Form.Group>
    );
}

export default QuizQuestion;
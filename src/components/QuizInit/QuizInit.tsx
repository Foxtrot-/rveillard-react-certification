import { Form, Button, Spinner, InputGroup } from 'react-bootstrap';
import { Category, Difficulty } from '../../types/quiz';
import { ChangeEvent, useEffect, useState } from 'react';
import { getCategories } from '../../api/opendb';

/** Type interface of props available for `QuizInit` component */
interface QuizInitProps {
    onSubmit: (category: number | undefined, difficulty: string) => void;
}

/**
 * Container component to display Quiz creation form.
 */
const QuizInit: React.FC<QuizInitProps> = ({onSubmit}: QuizInitProps) => {

    let [categories, setCategories] = useState<Category[]>([]);
    let [category, setCategory] = useState<number>();
    let [difficulty, setDifficulty] = useState<string>("");
    let [isLoading, setLoading] = useState(false);

    // Retrieve the categories on component mount.
    useEffect(() => {
        getCategories().then(response => {
            setCategories(response.data.trivia_categories)
            setLoading(false);
        })
    }, []);
    
    /** Handle category selection */
    const handleChangeCategory = (e: ChangeEvent<HTMLSelectElement>) => setCategory(parseInt(e?.target?.value) || undefined);
    /** Handle difficulty selection */
    const handleChangeDifficulty = (e: ChangeEvent<HTMLSelectElement>) => setDifficulty(e?.target?.value);
    /** Handle form creation */
    const handleCreate = () => onSubmit(category, difficulty);

    return (
        <>
        {isLoading 
        ? <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
        : <Form className='mb-5'>
            <InputGroup>
                <Form.Label htmlFor="categorySelect" visuallyHidden>
                    Category
                </Form.Label>
                <Form.Select id="categorySelect" required
                    value={category} 
                    onChange={handleChangeCategory}>
                    <option>Select a category</option>
                    { categories.map( (category) =>
                        <option value={category.id} key={category.id}>{category.name}</option>
                    )}
                </Form.Select>
                <Form.Label htmlFor="difficultySelect" visuallyHidden>
                    Difficulty
                </Form.Label>
                <Form.Select id="difficultySelect" required
                    value={difficulty} 
                    onChange={handleChangeDifficulty}>
                    <option>Select a difficulty</option>
                    { Object.entries(Difficulty).map( ([label, value]) =>
                        <option value={value} key={value}>{label}</option>
                    )}
                </Form.Select>
                <Button id="createBtn" onClick={handleCreate}>
                    Create
                </Button>
            </InputGroup>
        </Form>
        
        }
        </>);
    }
    
    export default QuizInit;
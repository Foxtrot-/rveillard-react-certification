export type Category = {
    id: number;
    name: string
};

export enum Difficulty {
    Easy = "easy",
    Medium = "medium",
    Hard = "hard"
}

export type Question = {
    question: string;
    answers: string[];
    correctAnswer: string;
    selectedAnswer?: string;
}

export type TriviaCategories = {
    trivia_categories: Category[];
}

export type TriviaQuestions = {
    results: TriviaQuestion[];
}

export type TriviaQuestion = {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export const toQuestion = (triviaQuestion: TriviaQuestion) : Question => {
    return {
        question: triviaQuestion.question,
        answers: getAnswersRandomOrder(triviaQuestion),
        correctAnswer: triviaQuestion.correct_answer,
    }
}

/**
 * Get the answers of the given Question shuffled
 * @param question The question for which to get the possible answers
 * @returns An array with answers in random order
 */
const getAnswersRandomOrder = (question: TriviaQuestion) : string[] => {
    let answersArray = Array.of(question.correct_answer, ...question.incorrect_answers);
    return fisherYatesShuffle(answersArray);
}

/**
 * Fisher Yates sorting algorithm
 * @param array The array to shuffle
 * @returns Shuffled array
 */
const fisherYatesShuffle = (array: string[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
};
import { TriviaCategories, TriviaQuestions } from "../types/quiz";
import axios, { AxiosResponse } from "axios";

/** 
 * REST request to get categories from Trivia API 
 */
export const getCategories = async () : Promise<AxiosResponse<TriviaCategories>> => {
    return axios.get("https://opentdb.com/api_category.php");
}

/**
 * REST request to get 5 questions for the given `category` and `difficulty` from Trivia API.
 * @param category The selected category
 * @param difficulty The selected difficulty
 */
export const getQuestions = async (category: number, difficulty: string) : Promise<AxiosResponse<TriviaQuestions>> => {
    return axios.get(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`);
}
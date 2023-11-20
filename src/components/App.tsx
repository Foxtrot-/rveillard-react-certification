import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Quiz from './Quiz/Quiz';
import QuizResults from './QuizResults/QuizResults';

function App() {
  return (
    <Container className="App mt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Quiz />} />
          <Route path="/results" element={<QuizResults />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;

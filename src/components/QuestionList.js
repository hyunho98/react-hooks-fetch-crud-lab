import React, { useEffect, useState} from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({ questions, setQuestions }) {
  useEffect(() => {
    fetch(`http://localhost:4000/questions`)
      .then((r) => r.json())
      .then(
        (questions) => setQuestions(questions)
      )
  }, [])

  const questionItems = questions.map((question) => {
    return (
      <QuestionItem
        key={question.id}
        question={question}
        onQuestionDelete={handleQuestionDelete}
        onAnswerChange={handleAnswerChange}
      />
    )
  })

  function handleQuestionDelete(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)

    setQuestions(updatedQuestions)
  }

  function handleAnswerChange(updatedQuestion) {
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedQuestion.id) {
        return updatedQuestion
      } else {
        return question
      }
    })

    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;

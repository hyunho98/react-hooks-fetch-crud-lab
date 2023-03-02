import React from "react";

function QuestionItem({ question, onQuestionDelete, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE"
    })
      .then((r) => r.json())
      .then(() => onQuestionDelete(question))
  }

  function handleAnswerChange(e) {
    const updatedAnswer = {
      correctIndex: e.target.value
    }

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedAnswer)
    })
      .then((r) => r.json())
      .then((updatedQuestion) => onAnswerChange(updatedQuestion))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleAnswerChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
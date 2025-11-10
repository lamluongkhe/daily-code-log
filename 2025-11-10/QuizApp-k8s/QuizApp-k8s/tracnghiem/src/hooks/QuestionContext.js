import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import { ENDPOINTS, createAPIEndpoint } from '../api/Api'




const QuestionContext = createContext()


export const QuestionProvider = ({ children }) => {


  const [questions, setQuestions] = useState([]);


  const fetchQuestions = () => {
    createAPIEndpoint(ENDPOINTS.getAllQuestions)
      .fetch()
      .then(res => {
        console.log(res.data)
        setQuestions(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);



  const createQuestion = ({ qnInWords, option1, option2, option3, option4, answer }) => {
    const newQuestion = {
      qnInWords,
      option1,
      option2,
      option3,
      option4,
      answer
    };

    createAPIEndpoint(ENDPOINTS.question)
      .post(newQuestion)
      .then(
        res => {
          let data = res.data
          setQuestions(prevQuestions => [...prevQuestions, data]);
          fetchQuestions();
        }
      )
      .catch(error => {
        console.error('Error:', error);
        // Xử lý lỗi nếu có
      });
  }

  const updateQuestion = (id, value) => {
    createAPIEndpoint(ENDPOINTS.question)
      .put(id, value)
      .then(
        res => {
          fetchQuestions();
        }
      )
      .catch(error => {
        console.error(error);
        // Xử lý lỗi nếu có
      });


  }

  const deleteQuestion = (id) => {
    createAPIEndpoint(ENDPOINTS.question)
      .delete(id)
    setQuestions(questions.filter((question) => question.qnId !== id))
  }

  return (
    <QuestionContext.Provider value={{ questions, deleteQuestion, createQuestion, updateQuestion }}>
      {children}
    </QuestionContext.Provider>
  )
}


export default QuestionContext;


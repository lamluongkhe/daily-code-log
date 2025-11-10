import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Layout from './components/Layout';
import Authentication from './components/Authentication';
import Question from './components/Question';
import { QuestionProvider } from './hooks/QuestionContext';
import CreateQuestion from './components/CreateQuestion';
import UpdateQuestion from './components/UpdateQuestion';
import ParticipantResult from './components/ParticipantResult';
import Register from './components/Register';
import ImportQuestion from './components/ImportQuestion';



function App() {
  return (
    <QuestionProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/questions" element={<Question />} />
          <Route path="/CreateQuestion" element={<CreateQuestion />} />
          <Route path="/UpdateQuestion/:id" element={<UpdateQuestion />} />
          <Route path="/participantresult" element={<ParticipantResult />} />
          <Route path="/importquestion" element={<ImportQuestion />} />
          <Route element={<Authentication />}>
            <Route path="/" element={<Layout />}>
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/result" element={<Result />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QuestionProvider>
  );
}


export default App;




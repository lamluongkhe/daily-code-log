import React, { useEffect, useState } from 'react'
import { BASE_URL, ENDPOINTS, createAPIEndpoint } from '../api/Api';
import { Box, Card, CardContent, CardHeader, CardMedia, LinearProgress, List, ListItemButton, Typography } from '@mui/material';
import { getFormatedTime } from '../helper/Time';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';

const time = 120;
const count = 9
export default function Quiz() {

  const [qns, setQns] = useState([]);
  const [qnsIndex, setQnsIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(time);
  const { context, setContext } = useStateContext();
  const navigate = useNavigate()
  let timer;

  const startTimer = () => {
    timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)
  }

  useEffect(() => {
    setContext({
      timeLeft: 0,
      selectedOptions: []
    });
    createAPIEndpoint(ENDPOINTS.question)
      .fetch()
      .then(res => {
        // Lấy danh sách câu trả lời đã xáo trộn
        const shuffledQuestions = shuffleQuestions(res.data);
        setQns(shuffledQuestions);
        startTimer();
      })
      .catch(err => { console.log(err) });

    return () => { clearInterval(timer) };
  }, []);
  // Hàm xáo trộn câu trả lời
  const shuffleQuestions = (questions) => {
    return questions.map(question => {
      // Tạo một bản sao của mảng câu trả lời
      const options = question.options.slice();
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Hoán đổi vị trí giữa các câu trả lời
        [options[i], options[j]] = [options[j], options[i]];
      }
      return { ...question, options };
    });
  };
  useEffect(() => {
    if (timeLeft === 0) {
      // Xử lý khi hết thời gian
      handleTimeout();
    }
  }, [timeLeft])
  const handleTimeout = () => {
    if (qnsIndex < count) {
      moveToNextQuestion();
    } else {
      setContext({ selectedOptions: [...context.selectedOptions], timeLeft });
      navigate("/result");
    }
  }
  const moveToNextQuestion = () => {
    clearInterval(timer); // Dừng đếm ngược
    setQnsIndex(qnsIndex + 1);
    setTimeLeft(time); // Đặt lại thời gian cho câu hỏi mới
    startTimer(); // Bắt đầu đếm ngược cho câu hỏi mới
  }
  const updateAnswer = (qnId, optionIdx) => {
    const temp = [...context.selectedOptions];
    const selectedValue = qns[qnsIndex].options[optionIdx];
    temp.push({
      qnId,
      selected: selectedValue,
    });

    if (qnsIndex < count) {
      setContext({ selectedOptions: [...temp] });
      moveToNextQuestion();
    } else {
      setContext({ selectedOptions: [...temp], timeLeft });
      navigate("/result");
    }
  };
  return (
    qns.length !== 0
      ? <Card sx={{
        maxWidth: 640, mx: 'auto', mt: 5,
        '& .MuiCardHeader-action': { m: 0, alignSelf: 'center' }
      }}>
        <CardHeader title={'Câu hỏi ' + (qnsIndex + 1) + ' trên 10'}
          action={<Typography>{getFormatedTime(timeLeft)}</Typography>}
        />
        <Box>
          <LinearProgress variant="determinate" value={(qnsIndex + 1) * 100 / 10} />
        </Box>
        {/* {qns[qnsIndex].imageName===null?
    <CardMedia component="img" image={BASE_URL + 'images/'+ qns[qnsIndex].imageName}/>
    :null} */}
        <CardContent>
          <Typography variant="h6">
            {qns[qnsIndex].qnInWords}
          </Typography>
          <List>
            {qns[qnsIndex].options.map((item, idx) =>
              <ListItemButton key={idx} onClick={() => updateAnswer(qns[qnsIndex].qnId, idx)}>
                <div>
                  {String.fromCharCode(65 + idx) + " . "}{item}
                </div>
              </ListItemButton>
            )}
          </List>
        </CardContent>
      </Card>
      : null
  )
}

import React, { useEffect, useState } from "react";
import useStateContext from "../hooks/useStateContext";
import { ENDPOINTS, createAPIEndpoint } from "../api/Api";
import { Box, Button, Card, CardContent, CardMedia, Typography, Alert } from "@mui/material";
import { getFormatedTime } from "../helper/Time";
import { useNavigate } from "react-router-dom";
import { blue } from '@mui/material/colors'
import Answer from "./Answer";

export default function Result() {
  const { context, setContext } = useStateContext();
  const [score, setScore] = useState(0);
  const [qnAnswer, setQnAnswers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const ids = context.selectedOptions.map((x) => x.qnId)
    createAPIEndpoint(ENDPOINTS.getanswer)
      .post(ids)
      .then((res) => {

        const qna = context.selectedOptions.map((x) => ({
          ...x,
          ...res.data.find((y) => y.qnId === x.qnId),
        }));
        setQnAnswers(qna);
        caculator(qna);
      })
      .catch((err) => console.log(err));
  }, []);

  const caculator = (qna) => {
    let tempScore = qna.reduce((acc, curr) => {
      return curr.answer === curr.selected ? acc + 1 : acc;
    }, 0);
    setScore(tempScore);

    // Gửi kết quả lên cơ sở dữ liệu ở đây
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: tempScore,
        timeTaken: context.timeTaken
      })
      .then(res => {
        console.log(res.data)
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000);
      })
      .catch(err => { console.log(err) });
  };

  const restart = () => {
    setContext({
      timeTaken: 0,
      selectedOptions: []
    })
    navigate("/quiz")
  }

  const submitScore = () => {
    createAPIEndpoint(ENDPOINTS.participant)
      .put(context.participantId, {
        participantId: context.participantId,
        score: score,
        timeTaken: context.timeTaken
      })
      .then(res => {
        console.log(res.data)
        setShowAlert(true)
        setTimeout(() => {
          setShowAlert(false)
        }, 4000);
      })
      .catch(err => { console.log(err) })
  }

  return (
    <>
      <Card
        sx={{ mt: 5, display: "flex", width: "100%", maxWidth: 640, mx: "auto" }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <CardContent sx={{ flex: "1 0 auto", textAlign: "center" }}>
            <Typography variant="h4">Congratulations!</Typography>
            <Typography variant="h6">YOUR SCORE</Typography>
            <Typography variant="h5" sx={{ fontWeidth: 600 }}>
              <Typography variant="span" color={blue[500]}>{score}</Typography>/10
            </Typography>
            {/* <Typography variant="h6">
              Took {getFormatedTime(context.timeTaken) + " mins"}
            </Typography> */}
            {/* <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={submitScore}
            >
              Submit
            </Button> */}
            {/* <Button variant="contained"
              sx={{ mx: 1 }}
              size="small"
              onClick={restart}
            >
              Re-try
            </Button> */}
            <Alert severity="success"
              variant="string"
              sx={{
                width: '60%',
                m: 'auto',
                visibility: showAlert ? 'visible' : 'hidden'
              }}
            >
              Score Updated.
            </Alert>
          </CardContent>
        </Box>
        <CardMedia component="img" sx={{ width: 220 }} image="/result.png" />
      </Card>
      <Answer qnAnswer={qnAnswer} />
    </>
  );
}

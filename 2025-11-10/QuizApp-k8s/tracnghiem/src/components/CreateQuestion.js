import React, { useContext, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import QuestionContext from '../hooks/QuestionContext';
import { useNavigate } from 'react-router-dom';

function CreateQuestion() {
    const { createQuestion } = useContext(QuestionContext);
    const navigate = useNavigate();

    const [qnInWords, setQnInWords] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [answer, setAnswer] = useState('');

    const [questionError, setQnInWordsError] = useState(false);
    const [option1Error, setOption1Error] = useState(false);
    const [option2Error, setOption2Error] = useState(false);
    const [option3Error, setOption3Error] = useState(false);
    const [option4Error, setOption4Error] = useState(false);
    const [answerError, setAnswerError] = useState(false);

    const [isSaved, setIsSaved] = useState(false);

    const handleSave = async () => {
        if (qnInWords && option1 && option2 && option3 && option4 && answer) {
            // Gửi dữ liệu để lưu
            try {
                await createQuestion({ qnInWords, option1, option2, option3, option4, answer });
                setIsSaved(true); // Đã lưu thành công
            } catch (error) {
                console.error(error);
            }
        }
        if (qnInWords === '') {
            setQnInWordsError(true);
        }
        if (option1 === '') {
            setOption1Error(true);
        }
        if (option2 === '') {
            setOption2Error(true);
        }
        if (option3 === '') {
            setOption3Error(true);
        }
        if (option4 === '') {
            setOption4Error(true);
        }
        if (answer === '') {
            setAnswerError(true);
        }
    }
    const handleAddAnotherQuestion = () => {
        // Đặt lại trạng thái và xóa thông báo "Lưu thành công"
        setQnInWords('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setAnswer('');
        setQnInWordsError(false);
        setOption1Error(false);
        setOption2Error(false);
        setOption3Error(false);
        setOption4Error(false);
        setAnswerError(false);
        setIsSaved(false);
    }
    return (
        <>
            <Container>
                <Typography variant="h3" gutterBottom align="center">
                    Create a new question
                </Typography>
                {isSaved ? (
                    <>
                        <Typography variant="h5" color="success">
                            Lưu thành công!
                        </Typography>
                        <Button onClick={handleAddAnotherQuestion} variant="contained">
                            Thêm câu hỏi khác
                        </Button>
                        <Button onClick={() => navigate('/Questions')} variant="outlined">
                            Quay lại
                        </Button>
                    </>
                ) : (
                    <form noValidate autoComplete='off'>
                        <Box pb={2}>
                            <TextField label="Question" onChange={(e) => setQnInWords(e.target.value)} error={questionError} variant="standard" fullWidth required />
                            <TextField label="Option1" onChange={(e) => setOption1(e.target.value)} error={option1Error} variant="standard" fullWidth required />
                            <TextField label="Option2" onChange={(e) => setOption2(e.target.value)} error={option2Error} variant="standard" fullWidth required />
                            <TextField label="Option3" onChange={(e) => setOption3(e.target.value)} error={option3Error} variant="standard" fullWidth required />
                            <TextField label="Option4" onChange={(e) => setOption4(e.target.value)} error={option4Error} variant="standard" fullWidth required />
                            <TextField label="Answer" onChange={(e) => setAnswer(e.target.value)} error={answerError} variant="standard" fullWidth required />
                        </Box>
                        <Button onClick={handleSave} variant="contained" startIcon={<SendIcon />}>Lưu</Button>
                    </form>
                )}
            </Container>
        </>
    )
}
export default CreateQuestion;

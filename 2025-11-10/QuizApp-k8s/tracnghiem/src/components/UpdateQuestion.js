import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'
import { useNavigate, useParams } from 'react-router-dom';
import QuestionContext from '../hooks/QuestionContext';
import { ENDPOINTS, createAPIEndpoint } from '../api/Api';

function UpdateQuestion() {


    const {updateQuestion} = useContext(QuestionContext);
    const {id} = useParams();
    
    const navigate=useNavigate();


    const [value,setValue] = useState({
        qnId: id,
        qnInWords: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: ""
    });

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.question)
      .fetchById(id)
        .then(response =>{
            setValue({...value
                ,qnInWords:response.data.qnInWords
                ,option1:response.data.option1
                ,option2:response.data.option2
                ,option3:response.data.option3
                ,option4:response.data.option4
                ,answer:response.data.answer})
        })
    },[id])

    const handleSubmit= (e) => {
        e.preventDefault();
        updateQuestion(id,value)
        navigate('/questions')
        
    }
    return (
        <>
        <Container>
        <Typography variant="h3" gutterBottom align="center">
            Create a new question
        </Typography>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
            <Box pb={2}>
                <TextField label="Question" value={value.qnInWords} onChange={e => setValue({...value,qnInWords:e.target.value})}  variant="standard" fullWidth required/>
                <TextField label="Option1"  value={value.option1} onChange={e => setValue({...value,option1:e.target.value})}   variant="standard" fullWidth required />
                <TextField label="Option2" value={value.option2}  onChange={e => setValue({...value,option2:e.target.value})}   variant="standard" fullWidth required />
                <TextField label="Option3" value={value.option3}  onChange={e => setValue({...value,option3:e.target.value})}   variant="standard" fullWidth required />
                <TextField label="Option4" value={value.option4}  onChange={e => setValue({...value,option4:e.target.value})}   variant="standard" fullWidth required />
                <TextField label="Answer"  value={value.answer}   onChange={e => setValue({...value,answer:e.target.value})}   variant="standard" fullWidth  required/>
            </Box>
            <Button type="submit" variant="contained" startIcon={<SendIcon/>}>Submit</Button>
        </form>
       </Container>
       </>
      )
}

export default UpdateQuestion;

import { Card, CardContent, CardHeader, IconButton, List, ListItemButton, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { green } from "@mui/material/colors";
import DeleteIcon from '@mui/icons-material/Delete';
import QuestionContext from '../hooks/QuestionContext';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate } from 'react-router-dom';


const question = [];

const QuestionCard = ({ question }) => {


  const { deleteQuestion } = useContext(QuestionContext);
  const navigate = useNavigate(); // Initialize navigate

  const handleEditClick = () => {
    // Chuyển hướng đến trang chỉnh sửa khi nút chỉnh sửa được nhấp
    navigate(`/UpdateQuestion/${question.qnId}`);
  };


  return (
    <>
      <Card>
        <CardHeader
          title={question.qnInWords} />
        <CardContent>
          <List>
            {question && question.options.map((item, idx) =>
              <ListItemButton key={idx}>
                <div>
                  {String.fromCharCode(65 + idx) + " . "}{item}
                </div>
              </ListItemButton>
            )}
          </List>
          <Typography variant="h6" align="left" sx={{ color: green[500] }}>
            True Answer: {question.answer}
          </Typography>
        </CardContent>
        <>
          <IconButton>
            <IconButton onClick={handleEditClick}>
              <EditIcon />
            </IconButton>
          </IconButton>
          <IconButton onClick={() => deleteQuestion(question.qnId)}>
            <DeleteIcon  ></DeleteIcon>
          </IconButton>
        </>
      </Card>
    </>
  )
}
export default QuestionCard;




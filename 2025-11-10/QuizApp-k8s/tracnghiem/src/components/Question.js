import React, { useContext, useState } from 'react';
import { Box, Container, Drawer, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import QuestionCard from './QuestionCard';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { purple } from '@mui/material/colors';
import ParticipantResult from './ParticipantResult';
import QuestionContext from '../hooks/QuestionContext';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export default function Question() {
  const [showParticipantResult, setShowParticipantResult] = useState(false);
  const navigate = useNavigate();
  const handleShowParticipantResult = () => {
    setShowParticipantResult(true);
  };


  return (
    <Container>
      <Typography variant="h3" gutterBottom align="center">
      </Typography>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Drawer variant="permanent" anchor="left">
            <List>
              <ListItem component="a" href="/CreateQuestion" className="custom-list-item" >
                <InboxIcon />
                <ListItemText primary="Create new question" />
              </ListItem>
              <ListItem className="custom-list-item" component="a" href="/Questions">
                <FormatListNumberedRtlIcon />
                <ListItemText primary="Show the Questions" />
              </ListItem>
              <ListItem onClick={handleShowParticipantResult} className="custom-list-item">
                <SportsScoreIcon />
                <ListItemText primary="Show participant results" color={purple[500]} />
              </ListItem>
              <ListItem component="a" href="/importquestion" className="custom-list-item">
                <ImportExportIcon /> {/* Đây là biểu tượng ImportExportIcon */}
                <ListItemText primary="Import" />
              </ListItem>
              <ListItem component="a" href="/" className="custom-list-item"
                onClick={() => {
                  navigate('/');
                }}
              >
                <ExitToAppIcon />
                <ListItemText primary="Log Out" />
              </ListItem>

            </List>
          </Drawer>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, marginLeft: '240px' }}>
          {showParticipantResult ? <ParticipantResult /> : <QuestionCardList />}
        </Box>
      </Box>
    </Container>
  );
}

const QuestionCardList = () => {
  const { questions } = useContext(QuestionContext);

  return (
    <>
      <Typography variant='h2' align='center' gutterBottom>Questions</Typography>
      <Grid container p={5} spacing={5}>
        {questions && questions.map((qs) => <Grid item xs={4} key={qs.qnId}><QuestionCard question={qs} /></Grid>)}
      </Grid>
    </>

  );
};

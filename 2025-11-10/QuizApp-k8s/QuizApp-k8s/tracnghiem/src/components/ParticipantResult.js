import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { ENDPOINTS, createAPIEndpoint } from '../api/Api';
import { CSVLink } from 'react-csv';


const columns = [
  { field: 'participantId', headerName: 'ID', width: 50 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'password', headerName: 'Password', width: 100 },
  { field: 'score', headerName: 'Score', width: 100 },
  { field: 'timeTaken', headerName: 'Time Taken', width: 100 }
]

const headers = [
  { label: "id", key: "participantId" },
  { label: "Email", key: "email" },
  { label: "Score", key: "score" },
  { label: 'Password', key: 'password' },
  { label: 'timeTaken', key: 'timeTaken' }
]


const ParticipantResult = () => {

  const [rows, setRows] = useState([]);

  const [user, setUser] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.participant)
      .fetch()
      .then((response) => {
        setRows(response.data); // Gán dữ liệu vào state rows
      })
      .catch((error) => {
        console.error('Error fetching participant data:', error);
      });
  }, []);
  const prepareDataForCSV = () => {
    return rows.map((row) => ({
      id: row.participantId,
      Email: row.email,
      Password: row.password,
      Score: row.score,
      TimeTaken: row.timeTaken
    }));
  };


  return (
    <div style={{ height: 500, width: "90%", margin: "auto" }}>
      <Typography variant='h2' align='center' gutterBottom>Score</Typography>

      <CSVLink data={prepareDataForCSV()} className="btn btn-danger mb-3">Export Participant Data</CSVLink>
      <DataGrid rows={rows} columns={columns} getRowId={(row) => row.participantId}>

      </DataGrid>
    </div>
  )
}
export default ParticipantResult;
import React from 'react'
import { useState } from 'react'

import * as XLSX from 'xlsx'
import { Data } from './Data';
import { ENDPOINTS, createAPIEndpoint } from '../api/Api';
import { useNavigate } from 'react-router-dom';

export default function ImportQuestion() {
    const [excelFile, setExcelFile] = useState(null);
    const [excelFileError, setExcelFileError] = useState(null);
    const navigate = useNavigate();
    const [excelData, setExcelData] = useState(null);
    const handleUpdate = () => {
        createAPIEndpoint(ENDPOINTS.postquestion)
            .post(excelData)
            .then(response =>
                console.log(response.data),
                navigate('/Questions')
            )
            .catch(error => {
                console.error('Error:', error);
                // Xử lý lỗi nếu có
            });
    };

    console.log(excelData);
    const fileType = ['application/vnd.ms-excel'];
    const handleFile = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFileError(null);
                    setExcelFile(e.target.result);
                }
            }
            else {
                setExcelFileError('Please select only excel file types');
                setExcelFile(null);
            }
        }
        else {
            console.log('plz select your file');
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data);
        }
        else {
            setExcelData(null);
        }
    }



    return (
        <div className="container">

            {/* upload file section */}
            <div className='form'>
                <form className='form-group' autoComplete="off" onSubmit={handleSubmit}>
                    <label><h5 className="upload-label">Upload Excel File</h5></label>
                    <div className="file-upload-container">
                        <input type='file' className='form-control' onChange={handleFile} required></input>
                        {excelFileError && <div className='text-danger file-error'>{excelFileError}</div>}
                    </div>
                    <button type='submit' className='btn btn-success submit-button'>Submit</button>
                </form>
            </div>

            <br></br>
            <hr></hr>

            {/* view file section */}
            <h5 className="view-label">View Excel file</h5>
            <div className='viewer'>
                {excelData === null && <>No file selected</>}
                {excelData !== null && (
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th scope='col'>Question</th>
                                    <th scope='col'>Option1</th>
                                    <th scope='col'>Option2</th>
                                    <th scope='col'>Option3</th>
                                    <th scope='col'>Option4</th>
                                    <th scope='col'>Answer</th>
                                </tr>
                            </thead>
                            <tbody>
                                <Data excelData={excelData} />
                            </tbody>
                        </table>
                        <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginTop: 5 + 'px' }}
                            onClick={handleUpdate}
                        >
                            Update
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
}

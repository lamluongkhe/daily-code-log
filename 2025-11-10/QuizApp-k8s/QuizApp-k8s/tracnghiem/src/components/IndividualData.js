import React from 'react'

export const IndividualData = ({ individualExcelData }) => {
    return (
        <>
            <th>{individualExcelData.QnInWords}</th>
            <th>{individualExcelData.Option1}</th>
            <th>{individualExcelData.Option2}</th>
            <th>{individualExcelData.Option3}</th>
            <th>{individualExcelData.Option4}</th>
            <th>{individualExcelData.Answer}</th>
        </>
    )
}

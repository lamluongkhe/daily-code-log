import { Accordion, AccordionDetails, AccordionSummary, Box, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { red, green, yellow } from '@mui/material/colors'

export default function Answer({ qnAnswer }) {
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    };
    const markCorrectOrNot = (qna, idx) => {
        const selectedOption = qna.selected; // Đáp án người dùng chọn
        const answer = qna.answer;
        // Kiểm tra xem đáp án người dùng có trùng với tùy chọn nào không
        const isCorrect = qna.options.map((option, i) => option === selectedOption);

        // Tạo một đối tượng style để áp dụng màu mặc định
        const style = { sx: {} };

        // Nếu là đáp án đúng, tô màu xanh
        if (selectedOption === answer && isCorrect[idx]) {
            style.sx.color = green[500]; // Nếu đúng, tô màu xanh
        } else if (selectedOption !== answer && isCorrect[idx]) {
            style.sx.color = red[500]; // Nếu sai, tô màu đỏ
        }

        return style;
    }
    return (
        <Box sx={{ mt: 5, width: '100%', maxWidth: 640, mx: 'auto' }}>
            {
                qnAnswer.map((item, j) => (<Accordion
                    disableGutters
                    key={j}
                    expanded={expanded === j}
                    onChange={handleChange(j)}
                >
                    <AccordionSummary expandIcon={<ExpandCircleDownIcon
                        sx={{
                            color: item.answer === item.selected ? green[500] : red[500]
                        }}
                    />}>
                        <Typography sx={{ width: '90%', flexShrink: 0 }}>
                            {item.qnInWords}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <List>
                            {item.options.map((x, i) =>
                                <ListItem key={i}>
                                    <Typography {...markCorrectOrNot(item, i)}>
                                        <b>
                                            {String.fromCharCode(65 + i) + '. '}
                                        </b>{x}
                                    </Typography>
                                </ListItem>
                            )}
                        </List>
                    </AccordionDetails>
                </Accordion>))
            }
        </Box>
    )
}

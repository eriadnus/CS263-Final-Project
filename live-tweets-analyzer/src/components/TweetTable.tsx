import {
    Paper,
    styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import React from "react";
import {strptime} from "../utils/strptime";
import {Team} from "../utils/utils";
import {TweetData} from "./Dashboard";

interface RowData {
    date: string,
    team: Team,
    sentiment_score: number,
    text: string,
}
const getRowData = (tweetData: TweetData): RowData => {
    return {
        date: strptime('%I:%M %p · %b %e, %Y', tweetData.date),
        team: tweetData.team,
        sentiment_score: tweetData.sentiment_score,
        text: tweetData.text.replace(/\s/g, ' ').slice(0, 20) + '...',
    }
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

interface TableProps {
    tableData: Array<TweetData>;
}
export const TweetTable = (props: TableProps) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell align="right">Team</StyledTableCell>
                        <StyledTableCell align="right">Sentiment&nbsp;Score</StyledTableCell>
                        <StyledTableCell align="right">Tweet</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData.map((tableRow) => getRowData(tableRow)).map((rowData, idx) => (
                        <StyledTableRow key={`table-row-${idx}`}>
                            <StyledTableCell component="th" scope="row">
                                {rowData.date}
                            </StyledTableCell>
                            <StyledTableCell align="right">{rowData.team}</StyledTableCell>
                            <StyledTableCell align="right">{rowData.sentiment_score}</StyledTableCell>
                            <StyledTableCell align="right">{rowData.text}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
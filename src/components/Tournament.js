import React from "react";
import {useData} from "../services/firebase";
import {
  CircularProgress,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import {Tournament} from "../util/tournament";

export default () => {
  const [data, updateData] = useData("t/sng/45/350");
  const sng45 = new Tournament(data ?? {});

  const reset = () => {
    const blank = new Tournament({
      payouts: {
        1: 41.03,
        2: 27.36,
        3: 20.18,
        4: 14.44,
        5: 9.41,
        6: 5.11,
        7: 1.52,
        loss: -3.5,
      },
      results: {
        1: 0,
        2: 1,
        3: 1,
        4: 1,
        5: 1,
        6: 1,
        7: 2,
        loss: 8,
      },
    });

    updateData(() => blank.data);
  };

  if (data === undefined) {
    return <CircularProgress />;
  }

  return (
    <>
      <Button onClick={reset}>Reset</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Place</TableCell>
              <TableCell align="right">Count</TableCell>
              <TableCell align="right">Payout</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sng45.payoutsByPlace.map(r => (
              <TableRow key={r.place}>
                <TableCell component="th" scope="row">
                  {r.place}
                </TableCell>
                <TableCell align="right">{r.count}</TableCell>
                <TableCell align="right">{r.payout}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

import React from "react";
import {useData} from "../services/firebase";
import {
  CircularProgress,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";
import {Add, Remove} from "@material-ui/icons";
import {Tournament} from "../util/tournament";
import {dollars, increment, decrement, add} from "../util/misc";

export default () => {
  const [data, dataRef] = useData("t/sng/45/350");
  const sng45 = new Tournament(data ?? {});

  const reset = () => {
    const blank = new Tournament({
      rates: {
        1: 41.03,
        2: 27.36,
        3: 20.18,
        4: 14.44,
        5: 9.41,
        6: 5.11,
        7: 1.52,
        loss: -3.5,
      },
    });

    dataRef.transaction(() => blank.data);
  };

  const addResult = place => {
    dataRef.child(`counts/${place}`).transaction(increment);
  };

  const removeResult = place => {
    dataRef.child(`counts/${place}`).transaction(decrement);
  };

  if (data === undefined) {
    return <CircularProgress />;
  }

  const summary = sng45.summary;
  const gamesPlayed = summary.map(r => r.count).reduce(add, 0);
  const netPay = summary.map(r => r.net).reduce(add, 0);

  return (
    <>
      <Button onClick={reset}>Reset</Button>
      <Table size="small" style={{width: "auto"}}>
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell padding="none" />
            <TableCell align="right">Count</TableCell>
            <TableCell padding="none" />
            <TableCell align="right">Net</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {summary.map(r => (
            <TableRow key={r.place}>
              <TableCell>{r.place}</TableCell>
              <TableCell align="right">{dollars(r.rate)}</TableCell>
              <TableCell align="right" padding="none">
                <IconButton size="small" onClick={() => removeResult(r.place)}>
                  <Remove fontsize="inherit" />
                </IconButton>
              </TableCell>
              <TableCell align="right">{r.count}</TableCell>
              <TableCell align="left" padding="none">
                <IconButton size="small" onClick={() => addResult(r.place)}>
                  <Add fontsize="inherit" />
                </IconButton>
              </TableCell>
              <TableCell align="right">{dollars(r.net)}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>Total:</TableCell>
            <TableCell />
            <TableCell />
            <TableCell align="right">{gamesPlayed}</TableCell>
            <TableCell />
            <TableCell align="right">{dollars(netPay)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

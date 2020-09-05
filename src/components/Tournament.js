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
import {dollars, increment, decrement} from "../util/misc";

export default () => {
  const [data, dataRef] = useData("t/sng/45/350");
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
    });

    dataRef.transaction(() => blank.data);
  };

  const addResult = place => {
    dataRef.child(`results/${place}`).transaction(increment);
  };

  const removeResult = place => {
    dataRef.child(`results/${place}`).transaction(decrement);
  };

  if (data === undefined) {
    return <CircularProgress />;
  }

  return (
    <>
      <Button onClick={reset}>Reset</Button>
      <Table size="small" style={{width: "auto"}}>
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell padding="none" />
            <TableCell align="right">Count</TableCell>
            <TableCell padding="none" />
            <TableCell align="right">Payout</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sng45.payoutsByPlace.map(r => (
            <TableRow key={r.place}>
              <TableCell component="th" scope="row">
                {r.place}
              </TableCell>
              <TableCell align="right" padding="none">
                {r.place !== "Total:" && (
                  <IconButton
                    size="small"
                    onClick={() => removeResult(r.place)}
                  >
                    <Remove fontsize="inherit" />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">{r.count}</TableCell>
              <TableCell align="left" padding="none">
                {r.place !== "Total:" && (
                  <IconButton size="small" onClick={() => addResult(r.place)}>
                    <Add fontsize="inherit" />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="right">{dollars(r.payout)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

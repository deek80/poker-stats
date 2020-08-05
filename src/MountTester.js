import React, {useState} from "react";
import {Switch, Typography} from "@material-ui/core";

const MountTester = ({children}) => {
  const [mounted, setMounted] = useState(false);
  return (
    <>
      <Typography>
        Mounted:
        <Switch
          checked={mounted}
          onChange={e => setMounted(e.target.checked)}
        />
      </Typography>
      {mounted && children}
    </>
  );
};

export default MountTester;

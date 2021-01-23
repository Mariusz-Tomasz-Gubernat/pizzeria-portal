import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const SwitchChanger = () => {
  const [switchState, setSwitchState] = useState(false);
  const handleStatus = () => {
    setSwitchState(!switchState);
  };
  return (
    <FormControlLabel
      control={
        <Switch checked={switchState} onChange={handleStatus} name='prepared' />
      }
      label='Prepared'
    />
  );
};

export default SwitchChanger;
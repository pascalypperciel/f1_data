import React, { useState, useEffect } from 'react';
import { Switch, FormControl, TextField, FormControlLabel, Button } from '@mui/material';
import './settings.css';

const Database = () => {
  const [isChecked, setIsChecked] = useState<boolean>(
    JSON.parse(localStorage.getItem('isChecked') || 'false')
  );

  const defaultCredentials = {
    databaseName: '',
    username: '',
    password: '',
    host: '',
    port: '',
  };

  const [credentials, setCredentials] = useState<{
    databaseName: string,
    username: string,
    password: string,
    host: string,
    port: string
  }>(
    JSON.parse(localStorage.getItem('credentials') || JSON.stringify(defaultCredentials))
  );

  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('isChecked', JSON.stringify(isChecked));
    localStorage.setItem('credentials', JSON.stringify(credentials));
  }, [isChecked, credentials]);

  const handleCredentialChange = (name: keyof typeof credentials, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCredentials(prev => ({ ...prev, [name]: (event.target as HTMLInputElement).value }));
  };

  const connectToDatabase = async () => {
    if (!isConnected) {
      const response = await fetch('http://localhost:5001/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        setIsConnected(true);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } else {
      const response = await fetch('http://localhost:5001/api/disconnect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        setIsConnected(false);
      } else {
        const data = await response.json();
        alert(data.message);
      }
    }
  };

  return (
    <div className="general-spacing">
      <FormControl component="fieldset">
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsChecked(e.target.checked)} />}
          label="Send Data to Database:"
          labelPlacement="start"
        />
        <TextField
          type="text"
          label="Database Name"
          margin="dense"
          disabled={!isChecked || isConnected}
          value={credentials.databaseName}
          onChange={(e) => handleCredentialChange('databaseName', e)}
        />
        <TextField
          type="text"
          label="Username"
          margin="dense"
          disabled={!isChecked || isConnected}
          value={credentials.username}
          onChange={(e) => handleCredentialChange('username', e)}
        />
        <TextField
          type="password"
          label="Password"
          margin="dense"
          disabled={!isChecked || isConnected}
          value={credentials.password}
          onChange={(e) => handleCredentialChange('password', e)}
        />
        <TextField
          type="text"
          label="Host"
          margin="dense"
          disabled={!isChecked || isConnected}
          value={credentials.host}
          onChange={(e) => handleCredentialChange('host', e)}
        />
        <TextField
          type="text"
          label="Port"
          margin="dense"
          disabled={!isChecked || isConnected}
          value={credentials.port}
          onChange={(e) => handleCredentialChange('port', e)}
        />
        <Button
          variant="contained"
          color={isConnected ? "success" : "primary"}
          onClick={connectToDatabase}
          disabled={!isChecked}
        >
          {isConnected ? "Connected" : "Connect"}
        </Button>
      </FormControl>
    </div>
  );
};

export default Database;

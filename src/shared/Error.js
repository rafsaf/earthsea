import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function Error(props) {

    if (props.show === true) {
      return (
        <div className='d-flex justify-content-center my-4'>
        <Alert className='w-auto' variant="danger" onClose={props.onExit}>
          <Alert.Heading className='text-center'>Wystąpił błąd podczas połączenia</Alert.Heading>
          <p>
            Kliknij poniżej by spróbować ponownie
            </p>
            <p>
            
          </p>
          
          <Button onClick={props.onExit} variant="outline-info">
            Spróbuj ponownie
          </Button>
        
        </Alert>
        </div>
      );
    } else if (props.show === null) {
        return (
            <CircularProgress color='primary' />
        );
    }
    return null;

}
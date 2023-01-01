import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { API } from 'aws-amplify';
import {
  createCheckin as createCheckinMutation,
} from "./graphql/mutations";

const useStyles = makeStyles((theme) => ({
  root: {
    background: 'linear-gradient(45deg, #2568ff 30%, #28a6ff 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgb(0 137 255 / 30%)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: '10px 10px 10px 10px',
    left: "50%",
    transform: "translate(-50%)"
  },
  mainBlock: {
    backgroundColor: "#d2f3ff",
    borderRadius: "20px",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    padding: "20% 30px 20% 30px",
    position: "absolute",
    top: "50%",
    left: "50%",
    width: '50%',
    transform: "translate(-50%, -50%)",
  },
  formBlock: {
  },
  formPadding: {
    margin: '10px 10px 10px 10px',
  },
  checkinTitle: {
    textAlign: "center",
  },
  timeAlignment: {
    textAlign: "center",
  }
}));


const Form = () => {
  const classes = useStyles();
  const [person, setPerson] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [time, setTime] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [submissionTime, setSubmissionTime] = React.useState('');

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // async function getPeople() {
  //   const response = await API.graphql({
  //     query: listPeople
  //   });
  //   const people = response.data.listPeople.items
  //   await setPeople(people);
  //   console.log(people);
  //   return people;
  // }

  async function addCheckin(name, lastname, position, fulldate) {
    const offset = fulldate.getTimezoneOffset();
    const pstDate = new Date(fulldate.getTime() - offset * 60 * 1000);
    const time =  pstDate.toISOString().slice(11, 19);
    const date =  pstDate.toISOString().slice(0, 10);
    const input = {name, lastname, position, time, date}
    console.log(input);
    const response = await API.graphql({
      query: createCheckinMutation,
      variables: {input}
    })
    console.log(response);
    // Do something with the updated person object
  }

  const handlePersonChange = (event) => {
    setPerson(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = new Date();
    setSubmissionTime(new Date());
    setSubmitted(true);
    const firstName = person.split(" ")[0];
    const lastname = person.split(" ")[1];
    addCheckin(firstName, lastname, position, date);
    //console.log(firstName + ";" + lastname + ";" + position + ";" + date.toLocaleString());
  };

  const handleGoBack = () => {
    setPerson('');
    setPosition('');
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div>
        <p>Checked in successfully!</p>
        <p>Person: {person}</p>
        <p>Position: {position}</p>
        <p>Submission Time: {submissionTime.toLocaleString()}</p>
        <Button onClick={handleGoBack}>Go back to form</Button>
      </div>
    );
  }

  return (
    <div>
      <div className={classes.mainBlock}>
      <Typography className={classes.checkinTitle} variant="h3" gutterBottom>Check in</Typography>
        <form className={classes.formBlock} onSubmit={handleSubmit}>
          <div className={classes.formPadding}>
            <TextField
              label="Person"
              id="person-select"
              value={person}
              fullWidth
              select 
              required
              onChange={handlePersonChange}
            >
              <MenuItem value="Person 1">Person 1</MenuItem>
              <MenuItem value="Person 2">Person 2</MenuItem>
              <MenuItem value="Person 3">Person 3</MenuItem>
            </TextField>
          </div>
          <div className={classes.formPadding}>
            <TextField
              label="Position"
              id="position-select"
              value={position}
              fullWidth
              select 
              required
              onChange={handlePositionChange}
            >
              <MenuItem value="Camera 1 Operator">Camera 1 Operator</MenuItem>
              <MenuItem value="Camera 2 Operator">Camera 2 Operator</MenuItem>
              <MenuItem value="Camera 3 Operator">Camera 3 Operator</MenuItem>
              <MenuItem value="Camera 4 Operator">Camera 4 Operator</MenuItem>
              <MenuItem value="Mixer">Mixer</MenuItem>
              <MenuItem value="Livestream">Livestream</MenuItem>
            </TextField>
          </div>
          <Button type="submit" variant="contained" className={classes.root}>
            Submit
          </Button>
          <br/>
          <br/>
          <Typography className={classes.timeAlignment} variant="h6">Submission Time: {time}</Typography>
        </form>
      </div>
    </div>
  );
}

export default Form;

import React from 'react';
import { makeStyles } from '@mui/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API } from 'aws-amplify';
import {
  createCheckin as createCheckinMutation,
} from "./graphql/mutations";
import { listCheckins } from "./graphql/queries";

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
  },
  table: {
    maxWidth: "1000px",
  },
  search: {
    margin: "10px 0px 10px 0px !important",
    minWidth: "1000px !important",
  },
}));


const Form = () => {
  const operators = [
    'Mark Chaban',
    'Tony Bagniy',
    'Fedor Torchilo',
    'Phil Chmil',
    'Max Gubenya',
    'Oleg Nochvay',
    'Mark Nesin',
    'Ruslan Balaban',
    'Nazar Kedrich',
    'Vadym Prozapas' ,
    'Viktor Izoita',
    'Max Nakonechniy',
    'Vasyl Sergiichuk',
    'Fillip Ugnivyy',
    'Sam Abramchuk',
    'Pavel Yarema' ,
    'Daniel Tishkov'
  ]
  const classes = useStyles();
  const [person, setPerson] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [time, setTime] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [errored, setErrored] = React.useState(false);
  const [viewingCheckins, setViewingCheckins] = React.useState(false);
  const [submissionTime, setSubmissionTime] = React.useState('');
  const [checkins, setCheckins] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredRows, setFilteredRows] = React.useState(checkins);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  async function getCheckins() {
    const response = await API.graphql({
      query: listCheckins
    });
    const checkins = response.data.listCheckins.items
    await setCheckins(checkins);
    await setFilteredRows(checkins);
    console.log(checkins);
    return checkins;
  }

  async function addCheckin(name, lastname, position, fulldate) {
    try {
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
    } catch (e) {
      setErrored(true);
    }
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
    setViewingCheckins(false);
  };

  const handleViewCheckins = () => {
    setViewingCheckins(true);
    setSubmitted(false);
    getCheckins();
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value);
    const searchWords = event.target.value.split(' ');
    setFilteredRows(
      checkins.filter(checkin =>
        searchWords.every(word =>
          checkin.name.toLowerCase().includes(word.toLowerCase()) ||
          checkin.lastname.toLowerCase().includes(word.toLowerCase()) ||
          checkin.position.toLowerCase().includes(word.toLowerCase()) ||
          checkin.date.toLowerCase().includes(word.toLowerCase())
        )
      )
    );
  };

  if (viewingCheckins) {
    return (
      <div>
        <Button onClick={getCheckins}>Re-Query Database</Button>
        <br></br>
        <TextField
          className={classes.search}
          label="Search"
          onChange={handleSearch}
          value={searchTerm}
        />
        <br></br>
        <TableContainer className={classes.table} component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Position</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.sort((b, a) => {
                const dateA = new Date(`${a.date} ${a.time}`);
                const dateB = new Date(`${b.date} ${b.time}`);
                return dateA - dateB;
              }).map(checkin => (
                <TableRow key={checkin.firstName}>
                  <TableCell component="th" scope="row">
                    {checkin.name}
                  </TableCell>
                  <TableCell align="right">{checkin.lastname}</TableCell>
                  <TableCell align="right">{checkin.position}</TableCell>
                  <TableCell align="right">{checkin.date}</TableCell>
                  <TableCell align="right">{checkin.time.split(":")[0] < 12 ? <>{checkin.time.split(":")[0].replace("0", "")}:{checkin.time.split(":")[1]} AM</> : <>{checkin.time.split(":")[0] - 12}:{checkin.time.split(":")[1]} PM</>}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={handleGoBack}>Go back to form</Button>
      </div>
    );
  }

  if (errored) {
    return (
      <div>
        <h1>Check in ERROR!!!!!</h1>
        <p>Please let Taras Lytvynchuk or Pavel Yarema know ASAP!!!</p>
      </div>
    );
  }

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
              {operators.map(operator => (
                <MenuItem value={operator}>{operator}</MenuItem>
              ))}
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
      <Button onClick={handleViewCheckins}>View Checkins</Button>
    </div>
  );
}

export default Form;

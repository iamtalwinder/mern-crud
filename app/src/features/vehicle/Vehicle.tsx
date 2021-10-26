import React, { useEffect, useState, useRef, MutableRefObject } from 'react';
import {
  IconButton,
  Input,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import RestoreIcon from '@mui/icons-material/Restore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getVehicles,
  removeVehicle,
  updateVehicle,
  addVehicle,
} from './vehicleSlice';

const useStyles: any = makeStyles(() => ({
  root: {
    width: '100%',
    marginTop: '30px',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 40,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const Row = ({ row }: any) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const prevState: MutableRefObject<any> = useRef(null);
  const [form, setForm] = useState({
    year: row.year,
    make: row.make,
    model: row.model,
  });

  const toggleEdit = () => {
    setIsEditing((prevState) => !prevState);
  };

  const onEditMode = () => {
    prevState.current = form;
    toggleEdit();
  };

  const offEditMode = () => {
    setForm(prevState.current);
    toggleEdit();
  };

  const onChange = (e: any) => {
    setForm((prevState) => {
      const newState: any = { ...prevState };
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  const classes = useStyles();

  return (
    <>
      <TableCell className={classes.selectTableCell}>
        {isEditing ? (
          <>
            <IconButton
              aria-label="done"
              onClick={() => {
                dispatch(updateVehicle(row._id, form));
              }}
            >
              <DoneIcon />
            </IconButton>
            <IconButton aria-label="revert" onClick={offEditMode}>
              <RestoreIcon />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton aria-label="edit" onClick={onEditMode}>
              <EditIcon />
            </IconButton>

            <IconButton
              aria-label="delete"
              onClick={() => dispatch(removeVehicle(row._id))}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {isEditing ? (
          <Input
            value={form.year}
            name="year"
            className={classes.input}
            onChange={onChange}
          />
        ) : (
          `${form.year}`
        )}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {isEditing ? (
          <Input
            value={form.make}
            name="make"
            className={classes.input}
            onChange={onChange}
          />
        ) : (
          `${form.make}`
        )}
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        {isEditing ? (
          <Input
            value={form.model}
            name="model"
            className={classes.input}
            onChange={onChange}
          />
        ) : (
          `${form.model}`
        )}
      </TableCell>
    </>
  );
};

const AddField = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    year: 2000,
    make: '',
    model: '',
  });

  const onChange = (e: any) => {
    setForm((prevState) => {
      const newState: any = { ...prevState };
      newState[e.target.name] = e.target.value;
      return newState;
    });
  };

  const classes = useStyles();

  return (
    <>
      <TableCell className={classes.selectTableCell}>
        <>
          <Button
            aria-label="done"
            onClick={() => {
              dispatch(addVehicle(form));
            }}
            variant="contained"
          >
            Add Vehicle
          </Button>
        </>
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <Input
          value={form.year}
          name="year"
          className={classes.input}
          onChange={onChange}
        />
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <Input
          value={form.make}
          name="make"
          className={classes.input}
          onChange={onChange}
        />
      </TableCell>
      <TableCell align="left" className={classes.tableCell}>
        <Input
          value={form.model}
          name="model"
          className={classes.input}
          onChange={onChange}
        />
      </TableCell>
    </>
  );
};

export default function Vehicle() {
  const dispatch = useDispatch();
  const vehicle: any = useSelector((state: any) => state.vehicle);
  const vehicles: any = useSelector((state: any) => state.vehicle.vehicles);

  useEffect(() => {
    dispatch(getVehicles());
  }, [dispatch]);

  useEffect(() => {
    if (!vehicle.success) {
      toast.error(vehicle.error.message);
    }
  }, [vehicle.success, vehicle.error]);

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="caption table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell align="left">Year</TableCell>
            <TableCell align="left">Make</TableCell>
            <TableCell align="left">Model</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles?.map((row: any) => (
            <TableRow key={row._id}>
              {console.log(row.make)}
              <Row row={row} />
            </TableRow>
          ))}
          <AddField />
        </TableBody>
      </Table>
    </Paper>
  );
}

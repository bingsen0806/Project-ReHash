import React, { useContext } from "react";
import "./createListing.css";
import TopBar from "../../components/topbar/TopBar";
import { Form, Button } from "react-bootstrap";

import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

export default function CreateListing() {
  const { user, sockio } = useContext(AuthContext);
  const classes = useStyles();
  const category = [
    { title: "Clothing" },
    { title: "Beauty" },
    { title: "Sports Equipments" },
    { title: "Home Appliances" },
    { title: "Automotive" },
    { title: "Clothing" },
    { title: "Hobbies" },
    { title: "Computers & Tech" },
    { title: "Others" },
    { title: "Outdoor Activities" },
    { title: "Travel" },
    { title: "Discussion" },
    { title: "Food" },
    { title: "Indoor Activities" },
    { title: "Sports" },
    { title: "Games & Esports" },
    { title: "Others" },
  ];
  return (
    <div className="createListingContainer">
      <TopBar currentUser={user} />
      <Form className="formWrapper">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="email" placeholder="Enter your swap title" />
          <Form.Text className="text-muted">
            Create an interesting title for your swap!
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Describe your swap"
          />
        </Form.Group>
        <Form.Group>
          <div className="fileButton">
            <Form.File
              id="exampleFormControlFile1"
              label="Upload photos of your swap"
            />
          </div>
        </Form.Group>
        <div className={classes.root}>
          <label className="formLabel">What is your swap category?</label>
          <Autocomplete
            className="formInput"
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={category}
            getOptionLabel={(option) => option.title}
            // defaultValue={}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select categories"
                placeholder="Swap categories"
              />
            )}
          />
        </div>
        <div className={classes.root}>
          <label className="formLabel">What is your ideal swap?</label>
          <Autocomplete
            className="formInput"
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={category}
            getOptionLabel={(option) => option.title}
            // defaultValue={}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Select ideal swaps"
                placeholder="Ideal swaps"
              />
            )}
          />
        </div>
        <Button className="postButton" variant="warning" type="submit">
          Post Swap
        </Button>
      </Form>
    </div>
  );
}

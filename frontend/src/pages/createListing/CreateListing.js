import React from 'react';
import "./createListing.css";
import TopBar from "../../components/topbar/TopBar";
import { Form, Button } from "react-bootstrap";

import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      width: 500,
      '& > * + *': {
        marginTop: theme.spacing(3),
      },
    },
}));



export default function CreateListing() {
    const classes = useStyles();
    const category = [{title: 'Sports'},
                        ];
    return (
        <div>
            {/* <TopBar /> */}
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="email" placeholder="Enter your swap title" />
                    <Form.Text className="text-muted">
                    Create an interesting title for your swap!
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Describe your swap"/>
                </Form.Group>
                <Form.Group>
                    <Form.File id="exampleFormControlFile1" label="Upload photos of your swap" />
                </Form.Group>
                <div className={classes.root}>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        id="multiple-limit-tags"
                        options={category}
                        getOptionLabel={(option) => option.title}
                        // defaultValue={}
                        renderInput={(params) => (
                        <TextField {...params} variant="outlined" label="limitTags" placeholder="Favorites" />
                        )}
                    />
                </div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
  useContext,
} from "react";
import { useDropzone } from "react-dropzone";
import "./createListing.css";
import TopBar from "../../components/topbar/TopBar";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import AddPhotoAlternateOutlinedIcon from "@material-ui/icons/AddPhotoAlternateOutlined";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { storage } from "../../firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
}));

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

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
    { title: "Computers and Tech" },
    { title: "Outdoor Activities" },
    { title: "Travel" },
    { title: "Discussion" },
    { title: "Food" },
    { title: "Indoor Activities" },
    { title: "Sports" },
    { title: "Games and Esports" },
    { title: "Others" },
  ];

  //Below is code for the Dropzone
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [idealCategories, setIdealCategories] = useState([]);
  const [swapCategories, setSwapCategories] = useState([]);
  const [isCreating, setCreating] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  //When file is dropped, set the new array of files based on different conditions
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (!!errors["images"]) {
        setErrors({
          ...errors,
          images: null,
        });
      }
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          customFileName: Date.now().toString().concat(file.name),
        })
      );
      var allFiles = [...files, ...newFiles];
      console.log(allFiles);
      console.log(allFiles.length);
      if (allFiles.length > 6) {
        allFiles = allFiles.slice(allFiles.length - 6, allFiles.length);
        console.log(allFiles);
      }
      setFiles(allFiles);
    },
    [errors, files]
  );

  //The useDropzone hook
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/*",
    onDrop: onDrop,
    maxFiles: 6,
  });

  //setting style for the dropzone
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  //previews of the images uploaded
  const thumbs = files.map((file) => (
    <div className="thumb" key={file.customFileName}>
      <img src={file.preview} className="userSwapImg" alt="" />
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  //Below is for Form Control

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    //if error exists, remove them from the error object
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null,
      });
    }
  };

  const findFormErrors = () => {
    const { title, description, tangible } = form;
    const newErrors = {};

    //title error
    if (!title || title === "") {
      newErrors.title = "title cannot be blank!";
    } else if (title.length > 50) {
      newErrors.title = "title cannot be more than 50 characters";
    }

    //description error
    if (!description || description === "") {
      newErrors.description = "description cannot be blank!";
    } else if (description.length > 800) {
      newErrors.description = "description cannot be more than 800 characters";
    }

    //Tangibles of intangibles not selected
    if (!tangible || tangible === "") {
      newErrors.tangible =
        "specify whether your item is tangible or intangible!";
    }

    //Swap category errors
    if (!swapCategories || swapCategories.length === 0) {
      newErrors.swapCategories = "select at least 1 category!";
    }

    //Ideal swap category errors
    if (!idealCategories || idealCategories.length === 0) {
      newErrors.idealCategories = "select at least 1 category!";
    }

    //Check for images
    if (files.length === 0) {
      newErrors.images = "you have to upload at least 1 image!";
    }

    return newErrors;
  };

  const uploadFirebaseOne = async (file) => {
    if (!file) {
      return "";
    }
    try {
      const imageFileName = file.customFileName;
      console.log("filename is: " + imageFileName);
      const uploadTask = await storage.ref(`items/${imageFileName}`).put(file);
      const imageUrl = await storage
        .ref("items")
        .child(`${imageFileName}`)
        .getDownloadURL();
      const trimImageUrl = imageUrl.replace(PF, "");
      console.log("trimImageUrl is: " + trimImageUrl);
      return trimImageUrl;
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  const uploadFirebaseMany = async (files) => {
    if (files.length === 0) return [];
    var fileUrls = [];

    try {
      for (var i = 0; i < files.length; i++) {
        console.log("processing file " + i);
        const file = files[i];
        const downloadFileResponse = await uploadFirebaseOne(file);
        fileUrls.push(downloadFileResponse);
        console.log(
          "finish processing file " + i + ": " + downloadFileResponse
        );
      }
      console.log("finish processing all files");
      console.log(fileUrls);
      return fileUrls;
    } catch (err) {
      return [];
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(newErrors);
    } else {
      setCreating(true);
      var newItemSwapCat = swapCategories.map((categoryObject) =>
        categoryObject.title.toLowerCase()
      );
      newItemSwapCat = [...newItemSwapCat, form.tangible];
      const newItemIdealSwap = idealCategories.map((categoryObject) =>
        categoryObject.title.toLowerCase()
      );

      try {
        //modified below
        const imageArray = await uploadFirebaseMany(files);
        console.log(imageArray);

        // const data = new FormData();
        // for (let i = 0; i < files.length; i += 1) {
        //   data.append("file", files[i]);
        //   data.append("name", files[i].customFileName);
        //   console.log("customFileName is: " + files[i].customFileName);
        //   console.log(typeof files[i].customFileName);
        // }
        // console.log(data);

        // const uploadFileRes = await axios.post("/api/upload/items", data);
        if (imageArray.length > 0 && !imageArray.includes("")) {
          const newItem = {
            userId: user._id,
            title: form.title,
            desc: form.description,
            img: imageArray,
            categories: newItemSwapCat,
            idealSwaps: newItemIdealSwap,
            status: "waiting",
          };
          console.log(newItem);
          const res = await axios.post("/api/items", newItem);
          console.log(res.data);
        }

        setFiles([]);
        setForm({
          tangible: "",
        });
        setIdealCategories([]);
        setSwapCategories([]);
        setCreating(false);
      } catch (err) {
        console.log(err);
        setFiles([]);
        setForm({
          tangible: "",
        });
        setIdealCategories([]);
        setSwapCategories([]);
        setCreating(false);
      }
    }
  };

  return (
    <div>
      <TopBar currentUser={user} />
      <div className="createListingContainer">
        <div className="createListingHeader">
          <span>Make your swap today!</span>
        </div>

        {/* /* for uploading of images */}
        <Row className="createListingContent">
          <Col xs={6}>
            <Card className="uploadImagesCard shadow p-3 mb-5 bg-white rounded">
              <Card.Body>
                <h5 className="uploadImagesCardHeader">
                  Drag and Drop images here
                </h5>
                <h6 className="uploadImagesCardSubHeader">
                  or click to upload
                </h6>
                <Form>
                  <Form.Group controlId="images">
                    <Form.Control
                      type="text"
                      style={{ display: "none" }}
                      isInvalid={!!errors.images}
                    />
                    <div className="swapImgDragAndDropWrapper">
                      <section className="container">
                        <div
                          {...getRootProps({ style })}
                          className="dragAndDropDiv"
                        >
                          <input {...getInputProps()} />
                          <p>
                            <AddPhotoAlternateOutlinedIcon fontSize="large" />
                          </p>
                          <p>Drop away your swap images...</p>
                        </div>
                        <aside className="thumbsContainer">{thumbs}</aside>
                      </section>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.images}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={6} className="createListingContentRight">
            <Form className="formWrapper">
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  className="swapAwayFormControl"
                  type="text"
                  maxlength="50"
                  placeholder="Enter your swap title"
                  value={form.title ? form.title : ""}
                  onChange={(e) => setField("title", e.target.value)}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
                <Form.Text className="text-muted">
                  Create an interesting title for your swap!
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="swapAwayFormControl"
                  as="textarea"
                  maxlength="800"
                  rows={3}
                  value={form.description ? form.description : ""}
                  placeholder="Describe your swap"
                  onChange={(e) => setField("description", e.target.value)}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="tangible">
                <Form.Label>Is your item Tangible or Intangible?</Form.Label>
                <Form.Control
                  className="swapAwayFormControl"
                  as="select"
                  value={form.tangible}
                  onChange={(e) => setField("tangible", e.target.value)}
                  isInvalid={!!errors.tangible}
                >
                  <option value="" disabled hidden selected>
                    Select category:
                  </option>
                  {/*The tangibles and intangibles spelling must be exactly like this for the database*/}
                  <option value="tangibles">Tangible</option>
                  <option value="intangibles">Intangible</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.tangible}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="swapCategories">
                <Form.Label>What is your swap category?</Form.Label>
                <Form.Control
                  type="text"
                  style={{ display: "none" }}
                  isInvalid={!!errors.swapCategories}
                />
                <div className={classes.root}>
                  <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags"
                    options={category}
                    value={swapCategories}
                    getOptionLabel={(option) => option.title}
                    onChange={(e, newValue) => {
                      if (!!errors["swapCategories"]) {
                        setErrors({ ...errors, swapCategories: null });
                      }
                      setSwapCategories(newValue);
                      console.log(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select categories"
                      />
                    )}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.swapCategories}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="idealCategories">
                <Form.Label>What is your ideal swap?</Form.Label>
                <Form.Control
                  type="text"
                  style={{ display: "none" }}
                  isInvalid={!!errors.idealCategories}
                />
                <div className={classes.root}>
                  <Autocomplete
                    multiple
                    limitTags={2}
                    id="multiple-limit-tags2"
                    options={category}
                    value={idealCategories}
                    getOptionLabel={(option) => option.title}
                    onChange={(e, newValue) => {
                      if (!!errors["idealCategories"]) {
                        setErrors({ ...errors, idealCategories: null });
                      }
                      setIdealCategories(newValue);
                      console.log(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Select ideal swaps"
                      />
                    )}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  {errors.idealCategories}
                </Form.Control.Feedback>
              </Form.Group>
              <Button
                className="postButton"
                variant="warning"
                onClick={handleSubmit}
                disabled={isCreating}
              >
                {isCreating ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Post Swap"
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

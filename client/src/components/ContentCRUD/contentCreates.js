import styles from "./styles.module.css";
import React, { useState, useEffect , Component} from 'react';
import { Link, useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';


const Main = () => {

	const {userName} = useParams();
	const settings = ["logout"];

	const [data, setData] = useState({
		type: "plans",
		contentName: "",
		contentCalories: 0,
		speciality: [],
		gender: [],
		eligible_age: 0,
		contentImage: "",
	});

	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	  };
	
	  const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	  }; 
	
	  const handleSettings = (event) =>
	  {
		console.log(event.currentTarget.name);
			localStorage.removeItem("token");
			window.location= "/";
	  };

	const Checkbox = (event) => {

    const [isChecked, setIsChecked] = useState(false);

    if (event.name === "speciality") {
      const checkHandler = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
          console.log(event.value);
          if (!data.speciality.includes(event.value)) {
            data.speciality.push(event.value);
          }
        } else {
          if (data.speciality.includes(event.value)) {
            data.speciality.splice(data.speciality.indexOf(event.value), 1);
          }
        }
        console.log(data.speciality);
      };

      return (

        <FormControlLabel
      control={
        <Checkbox
          checked={isChecked}
          onChange={checkHandler}
          color="primary"
        />
      }
      label={event.value}
    />
      );
    } else {
      const checkHandler = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
          console.log(event.value);
          if (!data.gender.includes(event.value)) {
            data.gender.push(event.value);
          }
        } else {
          if (data.gender.includes(event.value)) {
            data.gender.splice(data.gender.indexOf(event.value), 1);
          }
        }
        console.log(data.gender);
      };

      return (
        <div>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={checkHandler}
          />
          <label htmlFor="checkbox">{event.value}</label>
        </div>
      );
    }
  };

	const [error, setError] = useState("");
	const navigate = useNavigate();    

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location= "/";
	};

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
		console.log(data);
    };

	const handleCreate = async (e) => {
		e.preventDefault();
		try {
			const url = `http://3.19.53.25:8080/api/createContent/${userName}`;
			const { data: res } = await axios.post(url, data);
			const newUrl = `/staffhomepage/${userName}`;
			window.location = newUrl;
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}		
		console.log(data);
	};
	const [fileInput, setFileInput] = useState(null);

	const handleFileInputChange = (event) => {
		setFileInput(event.target.files[0]);
	};
	const [isLoading, setIsLoading] = useState(false);
	// const handleUploadVideo = async (event) => {
	// 	event.preventDefault();
	// 	setIsLoading(true);
	  
	// 	const formdata = new FormData();
	// 	formdata.append("file", fileInput);
	// 	console.log(fileInput);
	// 	data.contentImage= fileInput.name;
	// 	console.log(data.contentImage);
	// 	try {
	// 	  const response = await axios.post('http://ec2-18-218-81-23.us-east-2.compute.amazonaws.com:8080/api/UploadToBucket/upload', formdata, {
	// 		headers: {
	// 		  'Content-Type': 'multipart/form-data'
	// 		}
	// 	  });
	// 	  console.log(response.data);
	// 	//   setFileInput("");
	// 	  setIsLoading(false);
	// 	//   toast.success('File uploaded successfully!');
				
	// 	//   setUploadStatus('File uploaded successfully!');
	// 	} catch (error) {
	// 		setError(error.data);
	// 		// setUploadStatus('Could not Upload file!');
	// 	  console.error(error);
	// 	}
	//   };

	return (

			
		<div className={styles.main_container}>
<AppBar position="static">
						<Container maxWidth='xxl'>
                <Toolbar disableGutters>
                  <HomeIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}></HomeIcon>
				  <Typography
                      variant="h6"
                      noWrap
                      component="a"
                      href={`/staffhomepage/${userName}`}
                      sx={{
                        mr: 19,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'futura',
                        fontWeight: 500,
                        fontSize: 12,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                      }}
                    >
                      Healthy Hoosiers
                    </Typography>	
                    <Box sx={{ flexGrow: 0 }} justifyContent="flex-end">
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}  sx={{ p: 0, display: 'flex', justifyContent: 'flex-end' }}>
                          <Avatar />
                        </IconButton>
                      </Tooltip>
                      <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                      >
                        {settings.map((setting) => (
                          <MenuItem key={setting} onClick={handleSettings} name={setting}>
                            <Typography textAlign="center">{setting}</Typography>
                          </MenuItem>
                        ))}
                      </Menu>
                    </Box>
				</Toolbar>
              </Container>
			</AppBar>
            <div className={styles.create_container}>
					
					<form className={styles.form_container} onSubmit = {handleCreate}>
						<h1>Create Content</h1>
						
					    <div>

						<lable>
                            Content Type	: 
						<select onChange={handleChange}
									value={data.type}
									placeholder="Content Type"
									name="type"
									className={styles.select_dropdown}>
								<option value="plans">Plan</option>
								<option value="videos">Video</option>
						</select>
						</lable>
                        </div>
                        
						<div>
                        <lable>
                        Content Name	:     
						<input
							type="text"
							placeholder="Content Name"
							name="contentName"
							onChange={handleChange}
							value={data.contentName}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>
                        
						<div>
                        <lable>
                        Content Calories	: 
						<input
							type="number"
							placeholder="Content Calories"
							name="contentCalories"
							onChange={handleChange}
							value={data.contentCalories}
							required
							className={styles.input}
						/>
                        </lable>
                        </div>

						<div>
							<lable> Speciality	:
							<Checkbox name="speciality" value="Yoga">Yoga</Checkbox>
							<Checkbox name="speciality" value="Cardio">Cardio</Checkbox>
							<Checkbox name="speciality" value="Strength">Strength</Checkbox>
							<Checkbox name="speciality" value='Flexibility'>Aerobics</Checkbox>
							</lable>
						</div>		

						<div>
							<lable> Gender	:
							<Checkbox name="gender" value="Male" className={styles.checkbox_style}>Male</Checkbox>
							<Checkbox name="gender" value="Female"  className={styles.checkbox_style}>Female</Checkbox>
							</lable>
						</div>	
						{/* <div>				
							<input type="file" onChange={handleFileInputChange} />
							<button onClick={handleUploadVideo}>Upload</button>
						</div> */}
                        <div>
                        <lable>
                            Eligible Age	: 
                        <input
							type="eligible_age"
							placeholder="Eligible Age"
							name="eligible_age"
							onChange={handleChange}
							value={data.eligible_age}
							required
							className={styles.input}
						/>
                        </lable>
						
      					{/* <input type="file" onChange={handleFileInputChange} /> */}
                        </div>

						{error && <div className={styles.error_msg}>{error}</div>}
                        
						<div>
						<button type="submit" className={styles.black_btn_main} onClick = {handleCreate}>
							Create
						</button>
                        </div>
						
					</form>            
                </div>
					<div>
					{/* <form onSubmit={handleUploadVideo}>
							<input type="file" onChange={handleFileInputChange} />
							<button type="submit">Upload</button>
					</form> */}
					{isLoading && <div className="loader">Loading...</div>}
					{/* {uploadStatus && <div>{uploadStatus}</div>} */}
				</div>				
		</div>
	);
};

export default Main;
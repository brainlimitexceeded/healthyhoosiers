import styles from "./Styles.module.css";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

//For front end changes
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
import Tooltip from '@mui/material/Tooltip';
import HomeIcon from '@mui/icons-material/Home';
import { FormControl, FormLabel, TextField } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AiFillEye} from "react-icons/ai";
import {HiOutlinePencil} from "react-icons/hi";
import {ImBin} from "react-icons/im";





const settings = ["logout"];

const Main = () => {

	const {userType, userName} = useParams();
	const [searchResult, setSearchResult] = useState(null);
	const [error, setError] = useState("");
	const username = userName.split("@")[0];
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



	const handleDetails = (event) => {
		let nameOfEvent = event.target.getAttribute('name');
		const url = `/content/${nameOfEvent}`;
		console.log(url);
		window.location=url;
	};	

	const handleUpdate = (event) => {
		let contentName = event.target.getAttribute('name')
		window.location= `/updateContent/${userType}/${userName}/${contentName}`;
	};

	const handleDelete = async (event) => {
		let contentName = event.target.getAttribute('name');
		event.preventDefault();
		try {
			const url = `http://3.19.53.25:8080/api/deleteContent/${contentName}`;
			await axios.delete(url);
			window.location.reload();
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}		
	};


	useEffect(() => {
		const getData = async () => {
		  const searchResponse = await axios.get(
			 `http://3.19.53.25:8080/api/search/all/all/all/all/all/0`
		  );
		  setSearchResult(searchResponse.data);
		};
		getData();
	  }, []);

		function SearchResult(props) {
			const { data } = props;
	
				return (
						<div>
						<Typography                      
						variant="h6"
						noWrap
						component="a"
						sx={{
							mr: 19,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'futura',
							fontWeight: 500,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
				  }}>
						Manage Content :
					</Typography>
						<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label="simple table">
							<TableHead>
							<TableRow>
								<TableCell>S:No: </TableCell>
								<TableCell align="right">Content Name</TableCell>
								<TableCell align="right">No. of Calories</TableCell>
								<TableCell align="right">Approval Status</TableCell>
								<TableCell align="right">Actions</TableCell>
							</TableRow>
							</TableHead>
							<TableBody>
							{data.map((data,index) => (
								<TableRow
								key={data.index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
								>
								<TableCell component="th" scope="row">
									{index + 1}
								</TableCell>
								<TableCell align="right">{data.contentName}</TableCell>
								<TableCell align="right">{data.contentCalories}</TableCell>
								<TableCell align="right">{data.contentApproval}</TableCell>
								<TableCell align="right">
									<Button className={styles.btn_main} sx={{m: 2}} variant="contained" color="primary" type="button" value ="Details"   onClick={handleDetails} name = {data.contentName}><AiFillEye /></Button>
									<Button className={styles.btn_main}  sx={{m: 2}} variant="contained" color="primary" type="button" value= "Update" onClick={handleUpdate}  name = {data.contentName} ><HiOutlinePencil /></Button>
									<Button className={styles.btn_main}  sx={{m: 2}} variant="contained" color="primary" type="button" value= "Delete" onClick={handleDelete}  name = {data.contentName} ><ImBin /></Button>
									</TableCell>
								</TableRow>
							))}
							</TableBody>
						</Table>
						</TableContainer>
						</div>	
				);
			}			
	
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
                      href={`/adminHomepage/${userName}`}
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
					<Typography variant="p" sx={{ flexGrow: 1 }}>
					Welcome, {username}!
					</Typography>
                    <Box sx={{ flexGrow: 0 }}>
                      <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
			<div>
				{searchResult && <SearchResult data={searchResult} />}
			</div>		
		</div>
	);
};

export default Main;

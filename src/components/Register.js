import React,{useState} from 'react'
import '../css/styles.css';
import '../js/scripts.js';
import StorageHelper from '../helpers/StorageHelper';
import {  useNavigate } from "react-router-dom";


import { Card, TextField, CardContent , CardHeader, Button} from '@mui/material';


export default function Register() {
  const navigate = useNavigate();
  //const token = useContext(Context);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState([]);

  async function submitHandler(e){
      e.preventDefault();
      const data = {
          username: username,
          password: password,
          confirm_password: confirmPassword
      }
      
      const response = await fetch('http://65.0.132.5:8000/register/',{
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const result =await response.json();
      if(result.data.status_code===200)
      {
        StorageHelper.setLocal(result.data.user_data.token);
        navigate("/",{replace: true},{state:{token:result.data.user_data.token}})
      }
      if(result.data.status_code===400)
      {
          setError(result.data.message)
           console.log(result.data.message) 
      }
  }
    
  return (
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-lg-4">
                            <Card variant="outlined" className='mt-5'>
                            <center><CardHeader title="Register"/></center>

                                <CardContent>
                                <div className="form-floating mb-3 mr-3">
                                    <TextField id="fullwidth"
                                    label="Username"
                                    fullWidth
                                    variant='standard'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                                </div>

                                <div className="form-floating mb-3 mr-3">
                                    <TextField id="fullwidth"
                                    label="Password"
                                    type="password"
                                    fullWidth
                                    variant='standard'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                
                                <div className="form-floating mb-3 mr-3">
                                    <TextField id="fullwidth"
                                    label="Confirm Password"
                                    fullWidth
                                    type="password"
                                    variant='standard'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)} />
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-4 mb-0" style={{marginLeft:'150px'}}>
                                    <center>
                                    <Button variant="contained"
                                        color="success"
                                        size="small"
                                        onClick={submitHandler}>
                                        Submit
                                    </Button>
                                    </center>
                                    
                                </div>
                                
                                </CardContent>
                            
                            </Card>
                        </div>
                        </div>
                    </div>
                    
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer className="py-4 bg-light mt-auto">
                    <div className="container-fluid px-4">
                        <div className="d-flex align-items-center justify-content-between small">
                            <div className="text-muted">Copyright &copy; Your Website 2022</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        
  )
}


import { useState } from "react";

// react-router-dom components
import {Routes,Route,Link,useNavigate} from 'react-router-dom';

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import axios from '../../../axiosInstance'
import setAuthToken from "../../../axiosInstance"

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpg";

import {login} from "../../../ProtectedRoutes";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);

  
  const navigate = useNavigate();
  const [email, setEmail] = useState("")

  const [password, setPassword] = useState("")


 const handleSetRememberMe=()=>{
    setRememberMe(!rememberMe);
  }
  const handleSubmit = (evt) => {
  
      evt.preventDefault();
      axios.post('/user/signin', {
          email: email,
          password: password,
        })
        .then(function (response) {
          console.log(response);
          if(response.data){
            // setEmail('');
            // setPassword('');
            console.log(response?.data?.token)
            login(response?.data?.token)
            setAuthToken(response?.data?.token);
            alert(response?.data?.message)

            navigate('/');
          }else{
            alert('check your username and password')
          }
        })
        .catch(function (err) {
          console.log(err);
          if(!err?.response){
            alert('No Server Response')
          }else if(err.response?.status){
            alert(err.response?.data?.message)
          }
     
        });
  }

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" name={email} onChange={e => setEmail(e.target.value)} fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" name={password} onChange={e => setPassword(e.target.value)} fullWidth />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSubmit} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { useState } from "react";
import getServiceUrl from "../../utils/fetchHelper";
import fetchWrapper from "../../utils/fetchWrapper";
import { createSerializedFormData, setCookie } from "../../utils/common";
import { AUTH_TOKEN } from "../../constants";

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const loginFormSubmit = async () => {
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      isMultiPart: true,
      body: createSerializedFormData({
        email,
        password,
      }),
    };

    const loginUrl = getServiceUrl("login");
    const response = await fetchWrapper(loginUrl, fetchOptions);

    if (!response.error) {
      console.log("login response ... ", response);
      const { auth, _id, auth_token, expires_in } = response;
      // setCookie(AUTH_TOKEN, auth_token, expires_in, "s");
    } else {
    }
  };

  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        onClick={loginFormSubmit}
        fullWidth
        variant="contained"
        color="primary"
        //   className={classes.submit}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;

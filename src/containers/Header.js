import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Context } from "../stores/global/Context";
import { useContext } from "react";

const Header = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(Context);

  const isUserLoggedIn = !!user;

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <Button color="inherit">Home</Button>
          </Link>
          {isUserLoggedIn ? (
            <>
              <Button color="inherit">Welcome {user.firstName}</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button color="inherit">Login</Button>
              </Link>
              <Link href="/register">
                <Button color="inherit">Register</Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

import Header from "./Header";
import Container from "@material-ui/core/Container";

const Layout = ({ children }) => {
  return (
    <Container component="main">
      <Header />
      {children}
    </Container>
  );
};

export default Layout;

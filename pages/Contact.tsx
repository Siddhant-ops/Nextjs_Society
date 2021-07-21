import { Fragment } from "react";
import { useAuth } from "../Utils/Firebase/Auth/auth";

export default function Contact() {
  const auth = useAuth();

  return (
    <Fragment>
      <h1>Hello Contact</h1>
      {auth?.user}
    </Fragment>
  );
}

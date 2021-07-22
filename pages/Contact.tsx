import { Fragment } from "react";
import { useAuth } from "../Utils/Firebase/Auth/auth";

export default function Contact() {
  const auth = useAuth();

  return (
    <Fragment>
      <h1>Hello Contact</h1>
      <h1>{auth?.user?.email}</h1>
    </Fragment>
  );
}

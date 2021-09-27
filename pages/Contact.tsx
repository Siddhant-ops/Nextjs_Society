import PopAlert, { AlertStateType } from "../Components/Alert/PopAlert";
import styles from "../styles/Contact.module.scss";
import Image from "next/image";
import { useState } from "react";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import Head from "next/head";
import SendIcon from "@mui/icons-material/Send";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    details: "",
  });

  const [contactFormState, setContactFormState] = useState<AlertStateType>({
    message: "",
    severity: "info",
    visible: false,
  });

  function disableLoginBtn(): boolean {
    const { name, email, subject, details } = contactForm;
    if ((name && email && subject && details) === "") return true;
    else return false;
  }

  return (
    <div className={styles.mainContainer}>
      <Head>
        <title>Society Manager - Contact</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <Image
            src="/static/Images/ContactImg.svg"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className={styles.formContainer}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1>Contact</h1>
            <TextField
              className={styles.formInput}
              onChange={(e) => {
                setContactForm((prevContactForm) => {
                  return { ...prevContactForm, name: e.target.value };
                });
              }}
              value={contactForm?.name}
              required
              fullWidth
              variant="outlined"
              label="Name"
              type="text"
            />
            <TextField
              className={styles.formInput}
              onChange={(e) => {
                setContactForm((prevContactForm) => {
                  return { ...prevContactForm, email: e.target.value };
                });
              }}
              value={contactForm?.email}
              required
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
            />
            <TextField
              className={styles.formInput}
              onChange={(e) => {
                setContactForm((prevContactForm) => {
                  return { ...prevContactForm, subject: e.target.value };
                });
              }}
              value={contactForm?.subject}
              required
              fullWidth
              variant="outlined"
              label="Subject"
              type="text"
            />
            <TextareaAutosize
              onChange={(e) => {
                setContactForm((prevContactForm) => {
                  return { ...prevContactForm, details: e.target.value };
                });
              }}
              value={contactForm?.details}
              required
              placeholder="Details *"
              minRows={4}
              maxRows={10}
              className={styles.form__textArea}
            />
            <Button
              className={styles.brandBtn}
              type="submit"
              variant="outlined"
              disabled={disableLoginBtn()}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </form>
        </div>
      </div>
      {PopAlert(contactFormState, setContactFormState)}
    </div>
  );
}

import { Button, Grid, TextField } from "@mui/material";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { createProfile } from "../../../clients/profiles";

/**
 * For new users to sign up, provides input fields for personal information, and a button to submit the form.
 * @returns JSX.Element
 */
export const SignUp = ({email, id}: User) => {
  const [firstName, setFirstName] = useState<string>("");
  const [middleName, setMiddleName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProfile({
      firstName,
      middleName,
      lastName,
      birthDate: new Date(birthDate),
      phoneNumber,
      authId: id,
    });
  }
  
  return (
    <div>
      <h1>Sign Up</h1>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <TextField fullWidth label={"First Name"} variant="outlined" required value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        </Grid>
        <Grid item md={2}>
          <TextField fullWidth label={"M.I"} variant="outlined" value={middleName} onChange={(e) => setMiddleName(e.target.value)}/>
        </Grid>
        <Grid item md={5}>
          <TextField fullWidth label={"Last Name"} variant="outlined" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </Grid>
        <Grid item md={4}>
          <TextField fullWidth label={"Email"} variant="outlined" disabled value={email ?? ""}/>
        </Grid>
        <Grid item md={4}>
          <TextField fullWidth variant="outlined" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
        </Grid>
        <Grid item md={4}>
          <TextField fullWidth label={"Phone Number"} variant="outlined" value={phoneNumber ?? ""} onChange={(e) => setPhoneNumber(e.target.value)}/>
        </Grid>
        <Grid item md={11}></Grid>
        <Grid item md={1}>
          <Button fullWidth variant="contained" color="primary" onClick={(e) => handleSubmit(e)}>Submit</Button>
        </Grid>
      </Grid>
    </div>
  );
};

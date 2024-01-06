import { Grid, TextField } from "@mui/material";
import { useTenantProvider } from "../../Providers/Tenants/TenantProvider";
import { useCallback } from "react";

export const PersonalInput = () => {
  const {
    state: {
      tenant: {
        personal: { firstName, lastName, birthDate },
        contact: { email },
      },
    },
    dispatch,
  } = useTenantProvider();

  const updatePersonal = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "updatePersonal",
      payload: { [e.target.name]: e.target.value },
    })
  }, [dispatch])

  const updateEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "updateContact",
      payload: { [e.target.name]: e.target.value },
    })
  }, [dispatch])

  const updatePhone = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "updateContact",
      payload: {phone: { number: e.target.value, type: "primary" }},
    })
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      <Grid item md={5}>
        <TextField
          fullWidth
          label={"First Name"}
          name="firstName"
          variant="outlined"
          required
          value={firstName}
          onChange={updatePersonal}
        />
      </Grid>
      <Grid item md={2}>
        <TextField
          fullWidth
          label={"M.I"}
          variant="outlined"
          name="middleName"
          onChange={updatePersonal}
        />
      </Grid>
      <Grid item md={5}>
        <TextField
          fullWidth
          label={"Last Name"}
          name="lastName"
          variant="outlined"
          required
          value={lastName}
          onChange={updatePersonal}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          fullWidth
          label={"Email"}
          variant="outlined"
          name="email"
          value={email}
          onChange={updateEmail}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          fullWidth
          label={"Date of Birth"}
          name="birthDate"
          variant="outlined"
          type="date"
          value={birthDate}
          onChange={updatePersonal}
        />
      </Grid>
      <Grid item md={4}>
        <TextField
          fullWidth
          label={"Phone Number"}
          variant="outlined"
          name="phone"
          onChange={updatePhone}
        />
      </Grid>
    </Grid>
  );
};
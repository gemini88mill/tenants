import { Box, Grid, TextField } from "@mui/material";
import { useFormDataContextProvider } from "../../contexts/FormDataContext";

export const PersonalInput = () => {
  const {updatePersonal, getPersonal} = useFormDataContextProvider();

  return (
    <Box sx={{ width: 1 }}>
      <h4>Personal</h4>
      <Grid container spacing={2}>
        <Grid item md={5}>
          <TextField
            fullWidth
            label={"First Name"}
            name="firstName"
            variant="outlined"
            required
            autoComplete="off"
            onChange={(e) => updatePersonal(e, e.target.name)}
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            fullWidth
            label={"M.I"}
            variant="outlined"
            name="middleName"
            autoComplete="off"
            onChange={(e) => updatePersonal(e, e.target.name)}
          />
        </Grid>
        <Grid item md={5}>
          <TextField
            fullWidth
            label={"Last Name"}
            name="lastName"
            variant="outlined"
            required
            autoComplete="off"
            onChange={(e) => updatePersonal(e, e.target.name)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label={"Email"}
            variant="outlined"
            name="email"
            autoComplete="off"
            onChange={(e) => updatePersonal(e, e.target.name)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label={"Date of Birth"}
            name="birthDate"
            variant="outlined"
            type="date"
            autoComplete="off"
            onChange={(e) => updatePersonal(e, e.target.name)}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            label={"Phone Number"}
            variant="outlined"
            name="phone"
            autoComplete="off"
            onChange={(e) => updatePersonal(e, e.target.name)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

import { Box, Button, ButtonGroup, Grid, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { useFormDataContextProvider } from "../../contexts/FormDataContext";
import { Clear } from "@mui/icons-material";
import { useCallback } from "react";

export const AddressInput = () => {
  const {address: {getAddresses, addressTypes, addAddress, updateAddress}} = useFormDataContextProvider();
  const address = getAddresses();

  const updateField = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
    updateAddress(e, e.target.name, index);
  }, [updateAddress]);

  return (
    <Box sx={{width: 1}}>
      <h4>Address</h4>
      {address.map((address, index) => (
        <Grid key={`address-${index}`} container spacing={2} marginTop={1}>
          <Grid item md={4}>
            <Select value={address.addressType} fullWidth>
              {addressTypes?.map((addressType) => (
                <MenuItem key={addressType.id} value={addressType.id}>
                  {addressType.address_type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item md={8} alignSelf={"flex-end"}>
            <IconButton color="error">
              <Clear />
            </IconButton>
          </Grid>
          <Grid item md={9}>
            <TextField
              fullWidth
              label={"Address Line 1"}
              name="streetAddress"
              variant="outlined"
              value={address.streetAddress}
              onChange={(e) => updateField(e, index)}
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              fullWidth
              label={"Address Line 2"}
              name="streetAddress2"
              variant="outlined"
              value={address.streetAddress2}
              onChange={(e) => updateField(e, index)}
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              label={"City"}
              name="city"
              variant="outlined"
              value={address.city}
              onChange={(e) => updateField(e, index)}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              label={"State"}
              name="stateProvince"
              variant="outlined"
              value={address.stateProvince}
              onChange={(e) => updateField(e, index)}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              label={"Zip"}
              name="postalCode"
              variant="outlined"
              value={address.postalCode}
              onChange={(e) => updateField(e, index)}
            />
          </Grid>
        </Grid>
      ))}
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button variant="contained" onClick={addAddress}>Add</Button>
      </ButtonGroup>
      
    </Box>
  );

  // return (
  //   <Grid container spacing={2}>
  //         <Grid item md={4}>
  //           <Select value={""} fullWidth>
  //             {addressTypes?.map((addressType) => (
  //               <MenuItem key={addressType.id} value={addressType.id}>
  //                 {addressType.address_type}
  //               </MenuItem>
  //             ))}
  //           </Select>
  //         </Grid>
  //         <Grid item md={12}>
  //           <TextField
  //             fullWidth
  //             label={"Street"}
  //             name="street"
  //             variant="outlined"
  //             value={street}
  //             onChange={(e) => dispatch({type: "updateAddress", payload: {[e.target.name]: e.target.value}})}
  //           />
  //         </Grid>
  //         <Grid item md={6}>
  //           <TextField fullWidth label={"City"} variant="outlined" value={city} />
  //         </Grid>
  //         <Grid item md={2}>
  //           <TextField fullWidth label={"State"} variant="outlined" value={state} />
  //         </Grid>
  //         <Grid item md={4}>
  //           <TextField fullWidth label={"Zip"} variant="outlined" value={zip} />
  //         </Grid>
  //       </Grid>

  // );
};

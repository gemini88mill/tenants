import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { useTenantProvider } from "../../Providers/Tenants/TenantProvider";
import { useFormDataContextProvider } from "../../contexts/FormDataContext";

export const AddressInput = () => {
  const {address: {getAddresses, removeAddress, updateAddress}} = useFormDataContextProvider();
  const address = getAddresses();


  return (
    <>
      {address.map((address, index) => (
        <Grid key={`address-${index}`} container spacing={2}>
          <Grid item md={4}>
            <Select value={""} fullWidth>
              {addressTypes?.map((addressType) => (
                <MenuItem key={addressType.id} value={addressType.id}>
                  {addressType.address_type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item md={12}>
            <TextField
              fullWidth
              label={"Street"}
              name="street"
              variant="outlined"
              value={address.street}
              onChange={(e) =>
                dispatch({
                  type: "updateAddress",
                  payload: [{ [e.target.name]: e.target.value }],
                })
              }
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              fullWidth
              label={"City"}
              variant="outlined"
              value={address.city}
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              fullWidth
              label={"State"}
              variant="outlined"
              value={address.state}
            />
          </Grid>
          <Grid item md={4}>
            <TextField
              fullWidth
              label={"Zip"}
              variant="outlined"
              value={address.zip}
            />
          </Grid>
        </Grid>
      ))}
    </>
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

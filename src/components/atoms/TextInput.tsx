import { TextField } from "@mui/material";

type TextInputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = ({ label, name, value, onChange }: TextInputProps) => {
  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      variant="outlined"
      value={value}
      onChange={onChange}
    />
  );
};

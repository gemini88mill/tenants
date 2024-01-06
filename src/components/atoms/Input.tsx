import css from "./Input.module.css"

type InputProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  
}

export const Input = ({value, setValue, disabled}:InputProps) => {
  return <input 
    className={css.input}
    value={value}
    onChange={(e) => setValue(e.target.value)}
    disabled={disabled}
    required={true}
  />;
}
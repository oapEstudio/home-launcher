import { InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller, type FieldValues } from "react-hook-form";
import Required from "../../required/required.component";
import { styles } from "../styles";
import type { ITextInput } from "./text-input.interface";

function CustomTextInput<T extends FieldValues>(props: ITextInput<T>) {
  const {
    size = "small",
    defaultValue = "",
    label,
    required,
    value,
    type = "text",
    onChange,
    control,
    name,
    rules,
    minLength = 10,
    maxLength = 100,
    showCounter = true,
    ...rest
  } = props;

  // Reglas fusionadas: respetan las que pases desde afuera y rellenan defaults
  const mergedRules = {
    ...rules,
    minLength:
      rules?.minLength ??
      ({ value: minLength, message: `Mínimo ${minLength} caracteres` } as any),
    maxLength:
      rules?.maxLength ??
      ({ value: maxLength, message: `Máximo ${maxLength} caracteres` } as any),
  };


  const renderCounter = (len: number) =>
    showCounter ? (
      <small style={{ display: "block", marginTop: 4, color: "#777" }}>
        {len}/{maxLength}
      </small>
    ) : null;

  // Para rama "no controlada por RHF"
  const plainValueStr =
    value === undefined || value === null ? "" : String(value);
  const plainLen = plainValueStr.length;

  return (
    <>
      <div>
        {label && (
          <InputLabel sx={styles.label}>
            {label}
            {required && <Required value="*" />}
          </InputLabel>
        )}

        {control && name ? (
          <Controller
            defaultValue={defaultValue as any}
            control={control}
            name={name}
            rules={mergedRules}
            render={({ field: { onChange: fieldOnChange, onBlur, value }, fieldState: { error } }) => {
              const strVal = value === undefined || value === null ? "" : String(value);
              const len = strVal.length;

              return (
                <>
                  <TextField
                    {...rest}
                    sx={styles[size]}
                    error={!!error}
                    helperText={error?.message}
                    onBlur={onBlur}
                    onChange={(e) => {
                      const raw = e.target.value;
                      const next =
                        type === "number" ? (raw === "" ? "" : Number(raw)) : raw;
                      fieldOnChange(next);
                    }}
                    value={value ?? ""}
                    type={type}
                    inputProps={{
                      ...(type === "text" || type === "search" || type === "email" || type === "password"
                        ? { maxLength }
                        : {}),
                      ...rest.inputProps,
                    }}
                  />
                  {renderCounter(len)}
                </>
              );
            }}
          />
        ) : (
          <>
            <TextField
              {...rest}
              sx={styles[size]}
              variant="outlined"
              value={value ?? ""}
              onChange={(e) => {
                if (onChange) onChange(e as any);
              }}
              type={type}
              inputProps={{
                ...(type === "text" || type === "search" || type === "email" || type === "password"
                  ? { maxLength }
                  : {}),
                ...rest.inputProps,
              }}
            />
            {renderCounter(plainLen)}
          </>
        )}
      </div>
    </>
  );
}

export default CustomTextInput;

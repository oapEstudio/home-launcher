import { useState, useEffect } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Controller, type FieldValues } from "react-hook-form";
import Required from "../../required/required.component";
import dayjs from "dayjs";
import type { IDateInput } from "../date-input/date-input.interface";
import { InputLabel } from "@mui/material";
import { styles } from "../styles";

export default function CustomDateTimePicker<T extends dayjs.Dayjs, TC extends FieldValues>(
  props: IDateInput<T, TC>
) {
  const [dateTimeValues] = useState<any>();
  const {
    name,
    control,
    rules,
    label,
    required,
  } = props;

  useEffect(() => {
    console.log(dateTimeValues);
  }, [dateTimeValues]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <DemoContainer components={["DateTimePicker"]}>
        <DateTimePicker label={props.label} openTo="year" />
      </DemoContainer> */}

      <div>
        <InputLabel sx={styles.label}>
          {label}
          {required && <Required value="*" />}
        </InputLabel>
        {name && control ? (
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={() => (
              <DemoContainer sx={{margin: 0, padding: 0}} components={["DateTimePicker"]}>
                <DateTimePicker openTo="month" />
              </DemoContainer>
            )}
          />
        ) : (
          <DemoContainer components={["DateTimePicker"]}>
            <DateTimePicker label={props.label} openTo="year" />
          </DemoContainer>
        )}
      </div>
    </LocalizationProvider>
  );
}

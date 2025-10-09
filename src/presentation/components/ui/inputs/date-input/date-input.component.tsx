import { styles } from '../styles';
import type { IDateInput } from './date-input.interface';
import { DatePicker } from '@mui/x-date-pickers';
import { InputLabel } from '@mui/material';
import Required from '../../required/required.component';
import dayjs from 'dayjs';
import { Controller, type FieldValues } from 'react-hook-form';

export default function CustomDateInput<T extends dayjs.Dayjs, TC extends FieldValues>(props: IDateInput<T, TC>) {
  const { name, control, rules, size, format = 'DD/MM/YYYY', views, label, required, ...rest } = props;
  
  return (
    <div>
      <InputLabel sx={styles.label}>
        {label}
        {required && <Required value='*' />}
      </InputLabel>
      {name && control ? (
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
            <DatePicker
              value={value ? dayjs(value) as T : null}
              sx={styles[size]}
              format={format}
              views={views}
              slotProps={{
                textField: {
                  sx: styles[size],
                  error: Boolean(error),
                },
              }}
              {...rest}
              {...field}
              onChange={(date) => {
                onChange(date?.toISOString());
              }}
            />
          )}
        />
      )
        : (
          <DatePicker sx={styles[size]} format={format} views={views} {...rest} />
        )
      }
    </div>
  );
}
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Box, Button, FormHelperText, TextField } from '../../src';

interface FormState {
  readonly email: string;
}

const validations = Yup.object().shape({
  email: Yup.string().email().required(),
});

export const TextInputFormValidation01 = function () {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormState>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(validations),
  });

  const submitHandler = function (data: FormState) {
    console.log(data);
  };

  return (
    <Box>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Box marginBottom={10}>
            <TextField
              placeholder="Email"
              hideLabel
              error={Boolean(errors?.email?.message)}
              value={value}
              onChangeText={onChange}
            />
            {errors?.email?.message ? (
              <FormHelperText error fontSize={13} marginTop={5}>
                {errors.email.message}
              </FormHelperText>
            ) : null}
          </Box>
        )}
      />
      <Button label="Save" onPress={handleSubmit(submitHandler)} />
    </Box>
  );
};

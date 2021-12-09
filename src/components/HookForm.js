import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

export default function HookForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    console.log(JSON.stringify(values, null, 2));
  }
  const [registered, setRegistered] = useState(false);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '450px',
        minHeight: '400px',
        maxWidth: '450px',
        border: '1px solid teal',
        margin: '0 auto',
      }}
    >
      <form
        style={{ maxWidth: '600px' }}
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            placeholder="Email"
            {...register('email', {
              required: 'This is required',
              minLength: {
                value: 6,
                message: 'Passwords must match, minimum length is 6',
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'This is required',
              pattern: {
                value: /^.*(?=.{6,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[-_]).*$/,
                message: 'Entered value does not match email format',
              },
              minLength: { value: 6, message: 'Minimum length should be 6' },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        {registered && (
          <FormControl isInvalid={errors.confirmPassword}>
            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'This is required',
                minLength: { value: 6, message: 'Minimum length should be 6' },
                pattern: {
                  value: /^.*(?=.{6,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[-_]).*$/,
                  message: 'Entered value does not match email format',
                },
              })}
            />
            <FormErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </FormErrorMessage>
          </FormControl>
        )}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
          }}
        >
          {!registered && (
            <p
              style={{
                color: 'red',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'black', alignSelf: 'flex-end' }}>
                Not registered?
              </span>{' '}
              <span
                style={{ cursor: 'pointer', marginLeft: '17px' }}
                onClick={() => setRegistered(true)}
              >
                Register now
              </span>
            </p>
          )}
          {registered && (
            <p
              style={{
                color: 'red',
                display: 'flex',
                alignItems: 'baseline',
                marginRight: '10px',
                marginLeft: '-10px',
              }}
            >
              <span
                style={{
                  color: 'black',
                  marginLeft: '15px',
                  marginRight: '10px',
                }}
              >
                Already registered?
              </span>{' '}
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => setRegistered(false)}
              >
                Login now
              </span>
            </p>
          )}
        </div>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
          width="270px"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

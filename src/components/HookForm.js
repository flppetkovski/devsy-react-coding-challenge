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
        height: '600px',
      }}
    >
      <form
        style={{ maxWidth: '600px' }}
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">email</FormLabel>
          <Input
            id="email"
            placeholder="email"
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
            placeholder="password"
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
              placeholder="confirmPassword"
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
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          {!registered && (
            <p
              style={{
                color: 'red',
                display: 'inline-block',
                marginLeft: '10px',
              }}
            >
              <span style={{ color: 'black' }}>Not registered?</span>{' '}
              <span onClick={() => setRegistered(true)}>Register now</span>
            </p>
          )}
          {registered && (
            <p
              style={{
                color: 'red',
                display: 'inline-block',
                marginLeft: '10px',
              }}
            >
              <span style={{ color: 'black' }}>Already registered?</span>{' '}
              <span onClick={() => setRegistered(false)}>Login now</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

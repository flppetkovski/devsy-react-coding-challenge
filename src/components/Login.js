import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sign_up, login } from '../store/actions/auth';

export default function HookForm() {
  const loggedInUser = useSelector(state => state.loggedInUser);
  const [registered, setRegistered] = useState(false);
  const [badCredentials, setBadCredentials] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function onSubmit(data) {
    if (!registered) {
      dispatch(login(data.email, data.password));
      localStorage.setItem('email', JSON.stringify(data.email));
      navigate('/main');
    } else if (registered) {
      dispatch(sign_up(data.email, data.password, data.confirmPassword));
      localStorage.setItem('email', JSON.stringify(data.email));
      navigate('/main');
    } else if (data.password !== data.confirmPassword) {
      setBadCredentials(true);
    }
  }
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (!loggedInUser.length === 0) {
      navigate('/main');
    }
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '450px',
        border: '1px solid teal',
        margin: '0 auto',
        minHeight: '450px',
        maxHeight: '800px',
        marginTop: '20vh',
      }}
    >
      <form
        style={{ maxWidth: '600px' }}
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLabel
          style={{
            marginBottom: '10px',
            color: 'teal',
            fontSize: '25px',
            textAlign: 'center',
            boxSizing: 'border-box',
          }}
        >
          {registered ? (
            <p style={{ marginBottom: '-10px' }}>Register</p>
          ) : (
            'Login'
          )}
        </FormLabel>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            name="email"
            placeholder="Email"
            {...register('email', {
              required: 'This is required',
              minLength: {
                value: 6,
                message: 'Valid email must be provided',
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
            name="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'This is required',
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                message: 'Entered value does not match password format',
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
              id="confirmPassowrd"
              name="confirmPassowrd"
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                minLength: { value: 6, message: 'Minimum length should be 6' },
                pattern: {
                  value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/,
                  message: 'Entered value does not match password format',
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
        {badCredentials && (
          <p style={{ color: 'red' }}>You have entered wrong credentials</p>
        )}
      </form>
    </div>
  );
}

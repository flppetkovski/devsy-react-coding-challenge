import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { createABook, deleteBook, updateABook } from '../store/actions/books';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../components/Modal';

export default function EditBook() {
  const dispatch = useDispatch();
  const params = useParams();
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: state.name ? state.name : '',
      author: state.author ? state.author : '',
      year: state.year ? state.year : '',
      tags: state.tags ? state.tags : '',
    },
  });

  function onSubmit(data) {
    state.name
      ? dispatch(
          updateABook(`${params.id}`, {
            data,
            ...data,
            tags: data.tags,
          })
        )
      : dispatch(createABook({ ...data, tags: data.tags.split(' ') }));
    navigate('/main');
  }
  const loggedInUser = useSelector(state => state.loggedInUser);

  useEffect(() => {
    if (!loggedInUser.length === 0) {
      <Navigate to="/" />;
    }
  }, []);

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          maxHeight: '750px',
          minHeight: '400px',
          maxWidth: '600px',
          border: '1px solid teal',
          margin: '50px auto',
        }}
      >
        {modal && <Modal deleteBook={deleteBook} />}
        <form
          style={{ maxWidth: '600px' }}
          className="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isInvalid={errors.password}>
            <FormLabel
              style={{ marginBottom: '20px', marginTop: '20px' }}
              htmlFor="name"
            >
              Name
            </FormLabel>
            <Input
              style={{ marginBottom: '20px' }}
              id="name"
              ref={register}
              type="text"
              placeholder="Name"
              {...register('name', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel style={{ marginBottom: '20px' }} htmlFor="author">
              Author
            </FormLabel>
            <Input
              style={{ marginBottom: '20px' }}
              id="author"
              type="text"
              placeholder="Author"
              {...register('author', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.author && errors.author.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.year}>
            <FormLabel style={{ marginBottom: '20px' }} htmlFor="year">
              Year
            </FormLabel>
            <Input
              style={{ marginBottom: '20px' }}
              id="year"
              type="text"
              placeholder="Year"
              {...register('year', {
                required: 'This is required',
              })}
            />
            <FormErrorMessage>
              {errors.year && errors.year.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.tags}>
            <FormLabel style={{ marginBottom: '20px' }} htmlFor="tags">
              Tags
            </FormLabel>
            <Input
              style={{ marginBottom: '20px' }}
              id="tags"
              type="text"
              placeholder="Tags"
              {...register('tags')}
            />
            <FormErrorMessage>
              {errors.tags && errors.tags.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
              }}
              htmlFor="Actions"
            >
              Actions
            </FormLabel>
          </FormControl>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyItems: 'space-between',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <Modal
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              width="100px"
              onClick={() => setModal(true)}
              table={false}
            />
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              width="100px"
              onClick={() => navigate('/main')}
            >
              Cancel
            </Button>
            <Button
              mt={4}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
              width="100px"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

// /src/components/Modal/Auth/SignUp.tsx

import { authModalState } from "@/atoms/AuthModalAtom";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from "recoil";
import { auth } from '../../../firebase/clientApp';
import { FIREBASE_ERRORS } from '../../../firebase/errors';

const SignUp: React.FC = () => {
  const setAuthModalState = useSetRecoilState(authModalState);

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [createUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (error) setError('');
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpForm(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        placeholder="Email or username"
        type="email"
        mb={2}
        onChange={onChange}
        fontSize='13px'
        bg = 'gray.50'
        _placeholder={{color: 'gray.500'}}
        _hover={{
          bg: 'white',
          border: '2px solid',
          borderColor: 'blue.500'
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500'
        }}
      />
      <Input
        required
        name="password"
        placeholder="Password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize='13px'
        bg = 'gray.50'
        _placeholder={{color: 'gray.500'}}
        _hover={{
          bg: 'white',
          border: '2px solid',
          borderColor: 'blue.500'
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500'
        }}
      />
      <Input
        required
        name="confirmPassword"
        placeholder="Confirm password"
        type="password"
        mb={2}
        onChange={onChange}
        fontSize='13px'
        bg = 'gray.50'
        _placeholder={{color: 'gray.500'}}
        _hover={{
          bg: 'white',
          border: '2px solid',
          borderColor: 'blue.500'
        }}
        _focus={{
          outline: 'none',
          bg: 'white',
          border: '1px solid',
          borderColor: 'blue.500'
        }}
      />
      <Text textAlign='center' color='red' fontSize='10pt'> {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS] || userError?.message} </Text>
      <Button fontSize={'11pt'} type="submit" width='100%' height='36px' mt={2} mb={2} isLoading={loading}>
        Sign Up
      </Button>
      <Flex fontSize={'11pt'} justifyContent={'center'}>
        <Text mr={1}>Already a redditor?</Text>
        <Text
          color={'blue.500'}
          fontWeight={700}
          cursor={'pointer'}
          onClick={() => setAuthModalState(prev => ({
            ...prev,
            view: 'login'
          })) }
        >
          Log In
        </Text>
      </Flex>
    </form>
  )
}
export default SignUp;
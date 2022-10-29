import { useLoaderData } from "@remix-run/react";
import { useState, useMemo, useEffect, useCallback } from "react";
import useEffectWithoutFirstRun from '~/utils/useEffectWithoutFirstRun'
import { calculateAge } from '~/utils/dateUtils';
import ErrorMessage from '~/components/ErrorMessage'
import 'react-phone-input-2/lib/style.css'
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import React from 'react';
import {Text} from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Flex,
  Box,
  Heading,
  Input, 
  Button, 
  InputGroup, 
  InputLeftElement, 
  InputRightElement 
} from '@chakra-ui/react'
const pattern =  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
const phonePattern = {
  'US': {
    'prefix': '+1',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Flag_of_the_United_States.svg/2560px-Flag_of_the_United_States.svg.png'
  },
  'SPAIN': {
    'prefix': '+34',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Bandera_de_Espa%C3%B1a.svg/800px-Bandera_de_Espa%C3%B1a.svg.png'
  },
  'CHINA': {
    'prefix': '+86',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Flag_of_the_People%27s_Republic_of_China.svg/200px-Flag_of_the_People%27s_Republic_of_China.svg.png'
  },
  'UK': {
    'prefix': '+44',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg'
  },
  'France': {
    'prefix': '+33',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/270px-Flag_of_France.svg.png'
  },
  'GERMANY': {
    'prefix': '+49',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/640px-Flag_of_Germany.svg.png'
  },
  'ITALI': {
    'prefix': '+39',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Flag_of_Italy.svg/1200px-Flag_of_Italy.svg.png'
  },
  'SWITZERLAND': {
    'prefix': '+41',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Switzerland.svg/1200px-Flag_of_Switzerland.svg.png'
  },
  'BELGIUM': {
    'prefix': '+32',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Flag_of_Belgium.svg/1182px-Flag_of_Belgium.svg.png'
  },
  'NETHERLANDS': {
    'prefix': '+31',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Flag_of_the_Netherlands.svg/1280px-Flag_of_the_Netherlands.svg.png'
  },
  'DENMARK': {
    'prefix': '+45',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Denmark.svg/1200px-Flag_of_Denmark.svg.png'
  },
  'AUSRTIA': {
    'prefix': '+43',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Flag_of_Austria.svg/640px-Flag_of_Austria.svg.png'
  },
  'NORWAY': {
    'prefix': '+47',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Norway.svg/2560px-Flag_of_Norway.svg.png'
  },
  'SWEDEN': {
    'prefix': '+46',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Flag_of_Sweden.svg/1200px-Flag_of_Sweden.svg.png'
  },
  'GREECE': {
    'prefix': '+30',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/1200px-Flag_of_Greece.svg.png'
  },
  'HUNGARY': {
    'prefix': '+36',
    'pattern': /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    'flag': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Flag_of_Hungary.svg/640px-Flag_of_Hungary.svg.png'
  },

}

export default function Index() {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('')

  const [nom, setNom] = useState('');
  const [nomError, setNomError] = useState(false);
  const [nameErrorMessages, setNameErrorMessages] = useState('');

  const [cognoms, setCognoms] = useState('');
  const [cognomsError, setCognomsError] = useState(false);
  const [cognomsErrorMessages, setCognomsErrorMessages] = useState('');

  const [telefon, setTelefon] = useState('');
  const [telefonError, setTelefonError] = useState(false);
  const [telefonErrorMessage, setTelefonErrorMessage] = useState('');

  const [country, setCountry] = useState('');
  const [pais, setPais] = useState('');
  const [prefix, setPrefix] = useState('');
  const [telefonCountryError, setTelefonCountryError] = useState(false);
  const [telefonCountryErrorMessage, setTelefonCountryErrorMessage] = useState('');

  const [data, setData] = useState('');
  const [dataError, setDataError] = useState(false);
  const [dateErrorMessages, setDateErrorMessages] = useState('')

  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false)
  const [passwordErrorMessages, setpasswordErrorMessages] = useState('')

  const [terms, setTerms] = useState(false)
  const [errorTerms, setErorTerms] = useState(false)
  const [errorMessages, setErrorMessages] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const current = new Date();
  const currentDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;


  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessages('')
    if (!emailError && !passwordError && !nomError && !cognomsError && !telefonError && !dataError && !telefonCountryError) {
      setIsSubmitting(true)
      console.log('Submitted')
      let jsonData = { "email": email, "password": password, "name": nom, "surname": cognoms, "phone": `${prefix}${telefon}`, "birthdate": data, "country": pais }
      let response = fetch(`http://localhost:8000/accounts/register`,
        {
          method: 'POST',
          mode: 'cors',
          body: JSON.stringify(jsonData),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then(response => response.json())
        .catch((error) => {
          setIsSubmitting(false)
          setErrorMessages('Something went wrong')
        })
      try {
        const {success, msg} = await response
        setIsSubmitting(false)
        if(success){
          setIsRegistered(true)
        }
        else{
          setErrorMessages(msg)
        }
      }
      catch (e) {
        setErrorMessages('Unknown error')
      }
    }
    else {
      setErrorMessages("Please enter valid parameters")
      setIsSubmitting(false)
    }
  };

  //Validations
  const validateEmail = useCallback(() => {
    const mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi
    if (email === '') {
      setEmailErrorMessage('Email is required')
      setEmailError(true)
    }
    else if (email.match(mailformat) == null) {
      setEmailErrorMessage('Invalid email format')
      setEmailError(true)
    }
    else {
      setEmailErrorMessage('')
      setEmailError(false)
    }
  }, [email])


  const validateNom = useCallback(() => {
    if (nom === '') {
      setNameErrorMessages('Name is required');
      setNomError(true);
    } else if (nom.match(/^[A-Za-z]+$/) === null) {
      setNameErrorMessages('Name can\'t contain numbers');
      setNomError(true);
    } else {
      setNomError(false);
    }
    console.log('validate nom')
  }, [nom])


  const validateCognoms = useCallback(() => {
    console.log('validate cognom')
    if (cognoms === '') {
      setCognomsErrorMessages('Surname is required');
      setCognomsError(true);
    } else if (cognoms.match(/[0-9]+/) !=null) {
      setCognomsErrorMessages('Surname is incorrect');
      setCognomsError(true);
    } else {
      setCognomsError(false);
    }
  }, [cognoms])


  const validateTelefon = useCallback(() => {
    console.log('validate telefon', telefon)
    if (telefon === '') {
      setTelefonErrorMessage('Phone is required')
      setTelefonError(true)
    }
    else if (telefon.match(pattern) == null) {
      setTelefonErrorMessage('Invalid phone number')
      setTelefonError(true)
    }
    else {
      setTelefonErrorMessage('')
      setTelefonError(false)
    }
  }, [telefon])

  const validateTelefonCountry = useCallback(() => {
    console.log('validate telefon country', country)
    if (country === '') {
      setTelefonCountryErrorMessage('Phone country is required')
      setTelefonCountryError(true)
    }
    else {
      setTelefonCountryErrorMessage('')
      setTelefonCountryError(false)
      
    }
  }, [country])


  const validateData = useCallback(() => {
    console.log('validate data')
    let date = new Date(data)
    let current = new Date(currentDate)
    if (data === '') {
      setDateErrorMessages('Date is required')
      setDataError(true)
    } else if (date >= current) {
      setDateErrorMessages('You\'re not from the future');
      setDataError(true);
    } else if (calculateAge(date, current) < 18) {
      setDateErrorMessages('You must be of legal age');
      setDataError(true);
    }
    else {
      setDataError(false)
      setDateErrorMessages('')
    }

  }, [data])

  const validatePassword = useCallback(() => {
    if(password.length<8){
      setpasswordErrorMessages('Minimum 8 characters');
      setPasswordError(true);
    }
    else if (password.match(/(?=.*?[A-Z])/)==null){
      setpasswordErrorMessages("At least one uppercase letter");
      setPasswordError(true);
    }
    else if (password.match(/(?=.*?[a-z])/)==null){
      setpasswordErrorMessages("At least one lowercase letter");
      setPasswordError(true);
    }
    else if (password.match(/(?=.*?[0-9])/)==null){
      setpasswordErrorMessages("At least one digit");
      setPasswordError(true);
    }
    else if (password.match(/(?=.*?[#?.,!@$%^&*-])/)==null){
      setpasswordErrorMessages("At least one special character");
      setPasswordError(true);
    }
    else{
      setPasswordError(password === '')

    }
  }, [password])


  const validateParameters = useCallback(() => {
    validateEmail()
    validateData()
    validateCognoms()
    validateNom()
    validateTelefonCountry()
    validateTelefon()
    validatePassword()
    setErorTerms(!terms)
  }, [validateEmail, validatePassword, validateTelefon, validateNom, validateCognoms, validateData, terms])

  useEffectWithoutFirstRun(validateEmail, [email])
  useEffectWithoutFirstRun(validatePassword, [password])
  useEffectWithoutFirstRun(validateData, [data])
  useEffectWithoutFirstRun(validateTelefon, [telefon])
  useEffectWithoutFirstRun(validateNom, [nom])
  useEffectWithoutFirstRun(validateTelefonCountry, [country])
  useEffectWithoutFirstRun(validateCognoms, [cognoms])
  useEffectWithoutFirstRun(() => setErorTerms(!terms), [terms])
  useEffect(()=>console.log(prefix),[prefix])

  useEffect(()=>{
    setPrefix(country.replace(/^[A-Za-z ]+/,''))
    setPais(country.replace(/(\+)([0-9]+)/,''))
  },[country])

  return (
    <div className="register-form">
      <Flex width="full" align="center" justifyContent="center" padding={"20px"}>
        <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
            <Heading>{isRegistered ? 'Registered' : 'Register'}</Heading>
          </Box>


          {isRegistered ?
              <Box textAlign="center">
                <Text>{email} registered!</Text>
                <Button
                  colorScheme="orange"
                  variant="outline"
                  width="full"
                  mt={4}
                  onClick={() => location.href = '/'}
                >
                  Home
                </Button>
              </Box>
          :
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>

              <FormControl isInvalid={nomError}>
                <FormLabel>Name</FormLabel>
                <Input type='txt' value={nom} onChange={(e) => setNom(e.target.value)} />
                {!nomError ? null : (
                  <FormErrorMessage>{nameErrorMessages}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={cognomsError}>
                <FormLabel>Surname</FormLabel>
                <Input type='txt' value={cognoms} onChange={(e) => setCognoms(e.target.value)} />
                {!cognomsError ? null : (
                  <FormErrorMessage>{cognomsErrorMessages}</FormErrorMessage>
                )}
              </FormControl>


              <FormControl isInvalid={telefonError}>
                <FormLabel>Telephone</FormLabel>
                <Select type='txt' value={country} onChange={(e) => setCountry(e.target.value)}>
                  {getCountries().map((c) => (
                    <option key={c.value} value={c.value}>
                      {en[c]} +{getCountryCallingCode(c)}
                    </option>
                  ))}
                </Select>
                {!telefonCountryError ? null : (
                  <FormErrorMessage>{telefonCountryErrorMessage}</FormErrorMessage>
                )}
                <br></br>
                <Input type='text' value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                {!telefonError ? null : (
                  <FormErrorMessage>{telefonErrorMessage}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={dataError}>
                <FormLabel>Birth date</FormLabel>
                <Input type='date' max={currentDate} value={data} onChange={(e) => setData(e.target.value)} />
                {!dataError ? null : (
                  <FormErrorMessage>{dateErrorMessages}</FormErrorMessage>
                )}
                <FormControl isInvalid={emailError}>
                  <FormLabel>Email</FormLabel>
                  <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                  {!emailError ? null : (
                    <FormErrorMessage>{emailErrorMessage}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={passwordError}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={show ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => { setPassword(e.target.value) }
                      } />
                    <InputRightElement width='4.5rem'>
                      <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {!passwordError ? null : (
                    <FormErrorMessage>{passwordErrorMessages}</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={errorTerms}>
                  <Checkbox isChecked={terms} onChange={(c) => setTerms(c.target.checked)}>Accept terms and conditions</Checkbox>
                  {terms ? null : (
                    <FormErrorMessage>Must accept terms and conditions</FormErrorMessage>
                  )}
                </FormControl>
              </FormControl>
              {errorMessages && <ErrorMessage message={errorMessages} />}
              <Box textAlign="center">
                <Button mt={4} colorScheme='teal' isLoading={isSubmitting} onClick={validateParameters} type='submit' isDisabled={emailError || passwordError || nomError || cognomsError || telefonError || dataError || telefonCountryError || errorTerms } >
                  Register
                </Button>
              </Box>
            </form>

          </Box>
          }
        </Box>
      </Flex>
    </div >
  );
}

import { FieldValues, Path, UseFormGetValues } from 'react-hook-form';

export const validationRules = {
  username: {
    required: 'Username is required',
    minLength: {
      value: 3,
      message: 'Username must be at least 3 characters long',
    },
  },
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Invalid email format',
    },
  },
  phone: {
    required: 'Phone number is required',
    // minLength: {
    //   value: 10,
    //   message: 'Phone number must be at least 10 digits',
    // },
  },
  passwordValidation: {
    required: 'Password is required',
    minLength: {
      value: 6,
      message: 'Password must be at least 6 characters long',
    },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: 'Password must include an uppercase, a lowercase, and a number',
    },
  },
  verificationCode: {
    required: 'Verification code is required',
    minLength: {
      value: 6,
      message: 'Verification code must be 6 digits',
    },
    maxLength: {
      value: 6,
      message: 'Verification code must be 6 digits',
    },
  },
};

export const confirmPasswordValidation = <T extends FieldValues>(
  getValues: UseFormGetValues<T>,
  prop: Path<T>,
) => ({
  required: 'Confirm Password is required',
  validate: (value: string) => {
    const password = getValues(prop);
    return password
      ? value === password || 'Passwords do not match'
      : 'Password is missing for validation';
  },
});

export const birthdayValidation = (
  calculateAge: (birthdate: string) => number,
) => ({
  required: 'Birthday is required',
  validate: (value: string) =>
    calculateAge(value) >= 17 || 'You must be 17 or older to sign up',
});

export const isBirthdayPassedThisYear = (today: Date, birthDate: Date) =>
  today.getMonth() > birthDate.getMonth() ||
  (today.getMonth() === birthDate.getMonth() &&
    today.getDate() >= birthDate.getDate());

export const calculateAge = (birthdate: string) => {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  if (!isBirthdayPassedThisYear(today, birthDate)) age--;
  return age;
};

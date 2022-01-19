import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    values
  };
};

export const useInstantForm = (callback, initialState = {}) => {
  const [instantValues, _] = useState(initialState);

  const onClick = (event) => {
    // console.log(event, "---", event.target.name, "---", event.target.value);
    // setValues({ ...values, [event.target.name]: event.target.value });
    event.preventDefault();
    callback();
  };

  return {
    onClick,
    instantValues
  };
};


export const useFormInt = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onChangeInt = (event) => {
    setValues({ ...values, [event.target.name]: parseInt(event.target.value) });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    callback();
  };

  // console.log(values);
  return {
    onChange,
    onChangeInt,
    onSubmit,
    values
  };
};

// export const useButton = (callback, initialState = {}) => {
//   const [values, setValues] = useState(initialState);

//   const onClick = (event) => {
//     event.preventDefault();
//     callback();
//   }

//   return {
//     onClick,
//     value
//   }
// };


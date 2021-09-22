import { useState } from "react";

const useFormWithValidation = (initialValue = {}) => {
    const [values, setValues] = useState(initialValue);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = ({target}) => {
        const {name, value} = target;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage});
        setIsValid(target.closest("form").checkValidity());
    }

    const changeValues = (newData) => {
        setValues(newData);
    }
    
    return [values, errors, isValid, handleChange, changeValues];
}

export default useFormWithValidation;
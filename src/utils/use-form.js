import { useState } from "react";

const useFormWithValidation = () => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(true);

    const handleChange = ({target}) => {
        const {name, value} = target;
        setValues({...values, [name]: value});
        setErrors({...errors, [name]: target.validationMessage});
        setIsValid(target.closest("form").checkValidity());
    }

    return [values, errors, isValid, handleChange];
}

export default useFormWithValidation;
import React, { useState } from "react";
import Joi from "joi-browser";

function useValidate(schema) {
  const [data, setData] = useState({ password: '' });
  const [errors, setErrors] = useState({});
  const [ruleStatus, setRuleStatus] = useState({ password: false });

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const newSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, newSchema);
    return error ? error.details[0].message : null;
  };

  const validate = () => {
    const { error } = Joi.validate(data, schema, { abortEarly: false });
    if (!error) return null;

    const newErrors = {};
    const newRuleStatus = { ...ruleStatus }; // Создаем новый объект для обновления статуса правил

    for (let item of error.details) {
      newErrors[item.path[0]] = item.message;
      newRuleStatus[item.path[0]] = false; // Обновляем статус правила при обнаружении ошибки
    }
    setErrors(newErrors); // Обновляем состояние ошибок
    setRuleStatus(newRuleStatus); // Применяем обновленный статус правил

    return newErrors;
  };

  const handleSubmit = (e, doSubmit) => {
    e.preventDefault();
    const newError = validate();
    setErrors(newError || {});

    if (!newError) {
      doSubmit();
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    let newData = { ...data, [input.name]: input.value };
    setData(newData);

    const errorMessage = validateProperty(input);

    const newErrors = { ...errors };
    if (errorMessage) newErrors[input.name] = errorMessage;
    else delete newErrors[input.name];
    setErrors(newErrors);

    // Обновляем статус правила только при необходимости
    setRuleStatus(prevState => ({
      ...prevState,
      [input.name]: !errorMessage // Если сообщение об ошибке отсутствует, значит правило выполнено, ставим статус в true
    }));
  };

  return { data, errors, handleChange, handleSubmit, validate, ruleStatus};
}

export default useValidate;

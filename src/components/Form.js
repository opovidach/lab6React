import React, { useState } from 'react';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',
    city: ''
  });
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      setSubmittedData(formData);
      setFormData({
        username: '',
        email: '',
        password: '',
        birthdate: '',
        city: ''
      });
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (!data.username.trim()) {
      errors.username = 'Ім\'я користувача обов\'язкове';
    }
    if (!data.email.trim()) {
      errors.email = 'Електронна пошта обов\'язкова';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Введіть дійсну адресу електронної пошти';
    }
    if (!data.password.trim()) {
      errors.password = 'Пароль обов\'язковий';
    } else if (data.password.length < 6) {
      errors.password = 'Пароль повинен містити принаймні 6 символів';
    }
    return errors;
  };

  return (
    <div>
      {submittedData ? (
        <div className="submitted-data">
          <h2>Дякуємо за відправку!</h2>
          <p>Отримані дані:</p>
          <p><strong>Ім'я користувача:</strong> {submittedData.username}</p>
          <p><strong>Електронна пошта:</strong> {submittedData.email}</p>
          <p><strong>Пароль:</strong> {submittedData.password}</p>
          <p><strong>Дата народження:</strong> {submittedData.birthdate}</p>
          <p><strong>Місто:</strong> {submittedData.city}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Ім'я користувача:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Електронна пошта:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Дата народження:</label>
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Місто:</label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
            >
              <option value="">Оберіть місто</option>
              <option value="Kyiv">Київ</option>
              <option value="Lviv">Львів</option>
              <option value="Odesa">Одеса</option>
              {/* Додайте інші варіанти */}
            </select>
          </div>
          <button type="submit" className="submit-btn">Відправити</button>
        </form>
      )}
    </div>
  );
};

export default Form;

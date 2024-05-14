import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Store/appContext';
import MyModal from './MyModal';

function LoginForm() {
  const { actions } = useContext(Context);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [smShow, setSmShow] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: value });

    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationErrors = {};

    if (!formData.email) {
      validationErrors.email = 'Email is required';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }

    // If there are validation errors, set them and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Reset any previous errors
    setErrors({});

    actions
      .login(formData, setErrors)
      .then((response) => {
        if(!response){
          setSmShow(true)
        } else {
          navigate('/');
        }
        setFormData({
          email: '',
          password: '',
          remember: false,
        });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="mt-2">
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                isInvalid={!!errors.password}
              />
              <Button
                className={showPassword ? 'form-button' : 'outline-form-button'}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </div>
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </Form.Group>
        </div>

        <div className="mt-2">
          <Form.Group controlId="remember">
            <Form.Check
              type="checkbox"
              name="remember"
              label="Remember Me"
              checked={formData.remember}
              onChange={handleChange}
            />
          </Form.Group>
        </div>
        <div className="mt-3">
          <Button className='form-button' type="submit">
            Log In
          </Button>
        </div>
      </Form>

      {smShow ? <MyModal setShowModal={setSmShow} text={"Wrong email or password!"} title={"Login"} confirmFunction={() => {}}></MyModal> : <></>}

      {/* Modal centered show={smShow} onHide={() => setSmShow(false)} >
        <Form onSubmit={handleSubmit}>
          <Modal.Header id='ModalHeader' className='footerProfile' closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">Modifica Profilo</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modalProfile text-center'>{typeChange}</Modal.Body>
          <Modal.Footer className='modalProfile footerProfile'>
            {isModifyButton && showConfermButton ? <Button name='Modifica' type='submit' className='form-button-profile'>Conferma</Button>
            : !isModifyButton && showConfermButton ? <Button name='Elimina' type='submit' className='form-button-profile'>Conferma</Button>
            : <></>}
            {showConfermButton ? <Button className='form-button' onClick={() => setSmShow(false)}>Cancella</Button>
            : <Button className='form-button' onClick={() => setSmShow(false)}>Chiudi</Button>
            }
          </Modal.Footer>
        </Form>
      </Modal> */}

    </div>
  );
}

export default LoginForm;

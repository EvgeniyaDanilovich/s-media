import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginTC } from '../../state/auth-reducer';
import { AppStateType } from '../../state/redux-store';
import { TLoginFormProps, TLoginFormValues, TUserData } from '../../models/types-components';

// authorizedUserId, isAuth, serverErrorMessage, captchaUrl

const LoginForm: React.FC<TLoginFormProps> = ({ authorizedUserId, serverErrorMessage, captchaUrl, login }: TLoginFormProps) => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<TLoginFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<TLoginFormValues> = (data: TUserData) => {
        login(data.email, data.password, data.rememberMe, data.captcha);
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type={'email'} {...register('email', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Email'} />
                    {errors?.email && <p>{errors?.email.message}</p>}
                </div>
                <div>
                    <input type={'password'} {...register('password', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Password'} />
                    {errors?.password && <p>{errors?.password.message}</p>}
                </div>
                <div>
                    <input type={'checkbox'} {...register('rememberMe', { required: 'Confirm agreement' })} />Remember me
                    {errors?.rememberMe && <p>{errors?.rememberMe.message}</p>}
                </div>
                {serverErrorMessage ? <p>{serverErrorMessage}</p> : undefined}

                {captchaUrl && <img src={captchaUrl} alt="captcha" />}
                {captchaUrl && <input type={'text'} {...register('captcha', { required: true })} />}
                <div>
                    <button disabled={!isValid}>Log in</button>
                </div>
            </form>
        </>
    );
};

const Login: React.FC = () => {
    const authorizedUserId = useSelector((state: AppStateType) => state.auth.id);
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
    const serverErrorMessage = useSelector((state: AppStateType) => state.auth.serverErrorMessage);
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl);

    const dispatch = useDispatch();

    const login = (email: string, password: string, rememberMe: boolean, captcha: string) => {
        // @ts-ignore
        dispatch(loginTC(email, password, rememberMe, captcha))
    };

    if (isAuth) return <Navigate to={`/main/${authorizedUserId}`} />;

    return (
        <div className="container">
            <h1>Login</h1>
            <LoginForm authorizedUserId={authorizedUserId} serverErrorMessage={serverErrorMessage}
                       captchaUrl={captchaUrl} login={login} />
        </div>
    );
};

export default Login;
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginTC } from '../../state/auth-reducer';
import { AppStateType } from '../../state/redux-store';
import { TLoginFormProps, TLoginFormValues, TLoginProps, TMapStateToPropsLogin, TUserData } from '../../models/types-components';

const LoginForm: React.FC<TLoginFormProps> = ({ authorizedUserId, serverErrorMessage, captchaUrl, loginTC }: TLoginFormProps) => {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<TLoginFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<TLoginFormValues> = (data: TUserData) => {
        loginTC(data.email, data.password, data.rememberMe, data.captcha);
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

const Login: React.FC<TLoginProps> = ({ authorizedUserId, isAuth, serverErrorMessage, captchaUrl, loginTC }: TLoginProps) => {
    if (isAuth) return <Navigate to={`/main/${authorizedUserId}`} />;

    return (
        <div className="container">
            <h1>Login</h1>
            <LoginForm authorizedUserId={authorizedUserId} serverErrorMessage={serverErrorMessage}
                       captchaUrl={captchaUrl} loginTC={loginTC} />
        </div>
    );
};

const mapStateToProps = (state: AppStateType): TMapStateToPropsLogin => {
    return {
        authorizedUserId: state.auth.id,
        isAuth: state.auth.isAuth,
        serverErrorMessage: state.auth.serverErrorMessage,
        captchaUrl: state.auth.captchaUrl
    };
};

export default connect(mapStateToProps, { loginTC })(Login);
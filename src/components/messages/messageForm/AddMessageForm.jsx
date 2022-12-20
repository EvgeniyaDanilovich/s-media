import React from 'react';
import { useForm } from 'react-hook-form';

const AddMessageForm = ({ addMessage }) => {
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    const onSubmit = (data) =>{
        addMessage(data.message);
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea {...register('message', {
                    required: 'Enter text please',
                    maxLength: {value: 30, message: 'Max length is 30 symbols' } })}
                          placeholder="Enter message"></textarea>
                {errors?.message && <p>{errors?.message.message}</p>}
                <button>Add message</button>
            </form>
        </div>
    );
};

export default AddMessageForm;


// const onShowText = () => {
//     const newTextValue = textMessage.current.value;
//     updateMessageText(newTextValue);
// };
//
// const onAddMessage = () => {
//     addMessage();
// };


// <textarea onChange={onShowText} ref={textMessage} {...register('message')}
          // value={stateMessagesPage.newMessageText}></textarea>
// <button onClick={onAddMessage}>Add message</button>
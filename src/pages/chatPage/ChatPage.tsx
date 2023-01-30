import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MessageProps, TChatMessage, TMessageFormValues } from '../../models/types-components';

const ChatPage: React.FC = () => {
    return (
        <div className={'container'}>
            <Chat />
        </div>
    );
};
export default ChatPage;

export const Chat: React.FC = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null);
    useEffect(() => {
        let ws: WebSocket;

        const closeHandler = () => {
            setTimeout(createChannel, 300);
        };

        const createChannel = () => {
            ws?.removeEventListener('close', closeHandler);
            ws?.close();


            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx',);
            ws.addEventListener('close', closeHandler);
            setWsChannel(ws);
        };

        createChannel();

        return () => {
            ws.removeEventListener('close', closeHandler);
            ws.close();
        };
    }, []);

    return (
        <div>
            <Messages wsChannel={wsChannel} />
            <AddMessagesChatForm wsChannel={wsChannel} />
        </div>
    );
};

export const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [messages, setMessages] = useState<TChatMessage[]>([]);

    useEffect(() => {
        const messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data);
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
        };

        wsChannel?.addEventListener('message', messageHandler);

        return () =>{
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel]);

    return (
        <div style={{ height: '400px', overflowY: 'auto' }}>
            {messages.map((message, i) => <Message key={message.userId + i} message={message} />)}
        </div>
    );
};

export const Message: React.FC<MessageProps> = ({ message }) => {

    return (
        <div>
            <img style={{ width: '30px' }}
                 src={'https://static.vecteezy.com/system/resources/thumbnails/005/545/335/small/user-sign-icon-person-symbol-human-avatar-isolated-on-white-backogrund-vector.jpg'}
                 alt={'avatar'} />
            <img style={{ width: '30px' }} src={message.photo} alt={'avatar'} />
            {message.userName}
            {message.message}
        </div>
    );
};


export const AddMessagesChatForm: React.FC<{ wsChannel: WebSocket | null }> = ({ wsChannel }) => {
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending');

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<TMessageFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<TMessageFormValues> = (data) => {
        wsChannel?.send(data.message);
        reset();
    };

    useEffect(() => {
        const openHandler = () => {
            setReadyStatus('ready');
        };

        wsChannel?.addEventListener('open', openHandler);

        return () => {
            wsChannel?.removeEventListener('open', openHandler);
        };
    }, [wsChannel]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register('message', {
                required: 'Enter text please',
                maxLength: { value: 30, message: 'Max length is 30 symbols' }
            })}
                      placeholder="Enter message"></textarea>
            {errors?.message && <p>{errors?.message.message}</p>}
            <button disabled={readyStatus !== 'ready'}>Add message</button>
        </form>
    );
};

import { addPost, mainReducer } from './main-reducer';

const state = {
    posts: [
        { id: 1, message: 'Hello. I\'m react developer' },
        { id: 2, message: 'My dinner' },
        { id: 3, message: 'Post about me' }
    ]
};

it('New post should be added', () => {
    const action = addPost('New post');

    const newState = mainReducer(state, action);

    expect(newState.posts.length).toBe(4);
    expect(newState.posts[3].message).toBe('New post');
})

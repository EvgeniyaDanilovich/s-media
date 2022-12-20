import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('profileStatus component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus status="Some status" />);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('Some status');
    });

    test('after initialization <span> with status should be displayed', () => {
        const component = create(<ProfileStatus status="Some status" />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after initialization <input> with status shouldn\'t be displayed', () => {
        const component = create(<ProfileStatus status="Some status" />);
        const root = component.root;

        expect(() => {
            const input = root.findByType('input');
        }).toThrow();
    });

    test('after initialization <span> should contains correct status', () => {
        const component = create(<ProfileStatus status="Some status" />);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[0]).toBe('Some status');
    });

    test('<input> should be displayed in editMode instead of <span>', () => {
        const component = create(<ProfileStatus status="Some status" />);
        const root = component.root;
        const span = root.findByType('span');

        span.props.onDoubleClick();

        const input = root.findByType('input');
        expect(input.props.value).toBe('Some status');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status="Some status" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.onDeactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});
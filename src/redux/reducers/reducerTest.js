import { TEST_TYPE } from '../actionTypes';

const initialState = {
    testStr: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case TEST_TYPE: {
            const { str } = action.payload;

            return {
                ...state,
                testStr: str
            }
        }
        default:
            return state;
    }
}
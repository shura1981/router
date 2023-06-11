import { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';
import { Http } from '../../utils';
import { ResponseUsers, ResponseUser} from '../../models/ResponseUsers';
// import { GET_USERS, GET_PROFILE } from '../types';
const UserState = (props) => {
    const initialState = {
        users: [],
        selectedUser: null
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const getUsers = async () => {
        try {

            const reponse = await Http({ url: 'https://reqres.in/api/users' });
            const users = ResponseUsers.fromJson(reponse).users;

            dispatch({
                type: 'GET_USERS',
                payload: users
            })

        } catch (error) {
            console.log(error);
        }



    }

    const getProfile = async (id) => {
        try {
            const reponse = await Http({ url: 'https://reqres.in/api/users/' + id });
            const user = ResponseUser.fromJson(reponse);
            console.log(user);
            dispatch({
                type: 'GET_PROFILE',
                payload: user.data
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <UserContext.Provider
            value={{
                users: state.users,
                selectedUser:  state.selectedUser,
                getUsers,
                getProfile
            }}
        >
            {props.children}
        </UserContext.Provider>
    );


}


export default UserState;
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { backendApi } from '../../utility/api';
import { principalState } from '../../App';
import { User } from '../../utility/types';

export default function UserListPage() {
    
    const navigate = useNavigate();
    const principal = useRecoilValue(principalState);
    let users;

    function getUsers() {
        backendApi.get('/users', {
            headers: {
                authorization: principal?.token
            }
        }).then(response => {
            //users = mapUsers(response.data);
            console.log(response.data);
        });
    }

    getUsers();
    return (
        <main>
            <h1>Users</h1>
            <ul>
                {users}
            </ul>
        </main>
    )

    function mapUsers(users: Array<User>) {
        return users.map((user: User) => {    
            return (
                <li key={user.userId}>
                    <div>{user.email}</div>
                    <div>{user.username}</div>
                    <div>{user.active}</div>
                    <div>{user.registered}</div>
                </li>
            )
        })
    }
}


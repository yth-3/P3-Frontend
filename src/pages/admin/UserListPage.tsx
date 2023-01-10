import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { backendApi } from '../../utility/api';
import { principalState } from '../../App';

export default function UserListPage() {
    
    const navigate = useNavigate();
    const principal = useRecoilValue(principalState);

    backendApi.get('/users', {
        headers: {
            authorization: principal?.token
        }
    })
    .then((response) => console.log(response.data));
    return (
        <main>
            <h1>Users</h1>
        </main>
    )
}


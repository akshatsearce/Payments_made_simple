'use client';

import { useEffect, useState, ChangeEvent } from 'react';
import { Button } from './Button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
}

interface BulkUserResponse {
  user: UserType[];
}

export const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
        try {
        const response = await axios.get<BulkUserResponse>(
            `http://localhost:3000/api/v1/user/bulk?filter=${filter}`
        );
        setUsers(response.data.user);
        } catch (error) {
        console.error("Failed to fetch users:", error);
        }
    };

    fetchUsers();
    }, [filter]);


  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFilter(e.target.value);
          }}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </>
  );
};

interface UserProps {
  user: UserType;
}

function User({ user }: UserProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between my-2">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-full">
        <Button
          onClick={() => {
            router.push(`/send?id=${user._id}&name=${user.firstName}`);
          }}
          label="Send Money"
        />
      </div>
    </div>
  );
}

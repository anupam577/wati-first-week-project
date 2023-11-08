

import react, { useState, useEffect } from 'react';
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, styled } from '@mui/material'
// import { getUsers, deleteUser } from '../Service/api';
import { Link,useNavigate } from 'react-router-dom';

const StyledTable = styled(Table)`
    width: 90%;
    margin: 50px 0 0 50px;
`;

const THead = styled(TableRow)`
    & > th {
        font-size: 20px;
        background: #000000;
        color: #FFFFFF;
    }
`;

const TRow = styled(TableRow)`
    & > td{
        font-size: 18px
    }
`;


export default function ViewList() {
  const navigate = useNavigate();
  const [new_friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch data from the friend collection
    fetchFriendsData();
  }, []);

  const fetchFriendsData = async () => {
    try {
      // Assuming your API endpoint for the friend collection is "/api/friends"
      const response = await fetch("https://localhost:7126/api/showAllFriends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFriends(data);
      console.log(new_friends);
    } catch (error) {
      console.error("Error fetching friend data:", error);
    }
  };

  // Function to handle edit button click
  const handleEditClick = (friend) => {
    // Add the logic to navigate to the edit page for the selected friend
    navigate(`/editFriend/${friend}`); // Replace "/editFriend" with your edit friend route
  };

  // Function to handle delete button click
  const handleDeleteClick = async(friend) => {
    console.log(typeof(friend));
    try {
      // Assuming your API endpoint for deleting a friend is "/api/deleteFriend/{friendId}"
      const response = await fetch(`https://localhost:7126/api/deleteFriend/${friend}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the friend list after successful deletion
      const updatedFriends = new_friends.filter((f) => f._id !== friend._id);
      setFriends(updatedFriends);
    } catch (error) {
      console.error("Error deleting friend:", error);
      window.alert("Error deleting friend");
    }
    fetchFriendsData();
  };

  return (
   
    <StyledTable>
    <TableHead>
        <THead>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            {/* <TableCell>Username</TableCell> */}
            <TableCell>Email</TableCell>
            {/* <TableCell>Phone</TableCell> */}
            <TableCell></TableCell>
        </THead>
    </TableHead>
    <TableBody>
        {new_friends.map((user) => (
            <TRow key={user.id}>
                <TableCell>{user.id}</TableCell> {/* change it to user.id to use JSON Server */}
                <TableCell>{user.name}</TableCell>
                {/* <TableCell>{user.username}</TableCell> */}
                <TableCell>{user.email}</TableCell>
                {/* <TableCell>{user.phone}</TableCell> */}
                <TableCell>
                    <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/editFriend/${user.id}`}>Edit</Button> {/* change it to user.id to use JSON Server */}
                    <Button color="secondary" variant="contained" onClick={() => handleDeleteClick(user.id)}>Delete</Button> {/* change it to user.id to use JSON Server */}
                </TableCell>
            </TRow>
        ))}
    </TableBody>
</StyledTable>
  );
}

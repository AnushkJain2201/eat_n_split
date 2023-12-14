import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Aryan",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Anshika",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Suyash",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  // The first state is the array of friends that we had added;
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  const handleShowAddFriend = () => {
    setShowAddFriend((currShowAddFriend) => !currShowAddFriend);
  }

  const handleAddFriend = (friend) => {
    setFriends((currFriends) => [...currFriends, friend]);
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add Friend"}</Button>
      </div>

      <FormSplitBill />
    </div>
  );
}

export default App;

const FriendsList = ({friends}) => {
  

  return(
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

const Friend = ({friend}) => {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>

      {friend.balance < 0 && <p className="red">You owe {friend.name} &#8377; {Math.abs(friend.balance)}</p>}

      {friend.balance > 0 && <p className="green">{friend.name} owes you &#8377; {Math.abs(friend.balance)}</p>}

      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      
      <Button >Select</Button>
    </li>
  );
}

const Button = ({children, onClick}) => {
  return (
    <button className="button" onClick={onClick}>{children}</button>
  );
}

const FormAddFriend = ({handleAddFriend}) => {
  const[name, setName] = useState('');
  const[image, setImage] = useState('https://i.pravatar.cc/48');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0
    };

    setName("");
    setImage("https://i.pravatar.cc/48");
    
    handleAddFriend(newFriend);
  }

  return (
    <>
      <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>Friend Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Image URL</label>
        <input type="text" value={image}  onChange={(e) => setImage(e.target.value)}/>

        <Button>Add</Button>
      </form>

    </>
  );
}

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>💵 Bill Value</label>
      <input type="text" />

      <label>🧍Your Expense</label>
      <input type="text" />

      <label>🧑‍🤝‍🧑 X's Expense</label>
      <input type="text" disabled />

      <label>🤷‍♂️ Who Paid The Bill ?</label>
      <select>
        <option value='user'>You</option>
        <option value='friend'>X</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
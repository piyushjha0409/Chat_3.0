// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract chat {

    //user struct 
    struct user {
        string name;
        friend[] friendList;
    }

   //friend struct 
    struct friend {
      address pubkey;
      string name;
    }

   //message struct 
    struct message {
        address sender;  //wallet address type is address 
        uint timestamp;
        string msg;
    }

   //All user struck 
   struct AllUserStruck {
     string name;  //name of the user 
     address accountAddress;  //address the of the wallet
   }

   AllUserStruck[] getAllUsers;

   mapping(address => user) userList;
   mapping(bytes32 => message[]) allMessages;

   //CHECK THE USER EXISTS OR NOT 
   function checkUserExists(address pubkey) public view returns(bool){
      return bytes (userList[pubkey].name).length > 0;
   }   
   

   //IF THE USER IS NOT EXISTING THEN WE HAVE TO REGISTER ONE 
   //external means that anybody can call it 
   function createUser(string calldata name) external {
      //one who already created an account 
      require(checkUserExists(msg.sender) == false, "User Already Exists!");
      require(bytes(name).length > 0, "Username cannot be empty");

      userList[msg.sender].name = name;

      getAllUsers.push(AllUserStruck(name, msg.sender)); //msg.sender is the account address
   } 

   //GET USERNAME
    function getUsername(address pubkey) external view returns(string memory){
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

   //Adding a friend
   function addFriend(address friend_key, string calldata name) external{
    require(checkUserExists(msg.sender), "Create an account first!");
    require(checkUserExists(friend_key), "User already registred!");
    require(msg.sender != friend_key, "Users cannot add themselves as friends");
    require(checkAlreadyFriends(msg.sender, friend_key) == false, "These users are already friend!");

    _addFriend(msg.sender, friend_key, name);
    _addFriend(friend_key, msg.sender, userList[msg.sender].name);
   }

   //function for checking already friends or not 
   function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool){
    
    if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length){
        address temp = pubkey1;
        pubkey1 = pubkey2;
        pubkey2 = temp;
    }

    for(uint256 i=0; i<userList[pubkey1].friendList.length; i++){

        if(userList[pubkey1].friendList[i].pubkey == pubkey2) return true;  //because we are comparing the value of the public key thats why ==   
    }
     return false;
   }

   //function for adding the friend
   function _addFriend(address me, address friend_key, string memory name) internal{
    friend memory newFriend = friend(friend_key, name);
    userList[me].friendList.push(newFriend);
   }

   //GET MY FRIEND
   function getMyFriendList() external view returns(friend[] memory){   
    return userList[msg.sender].friendList;
   }

   //get chat code
   function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32){
    if(pubkey1 > pubkey2){
        return keccak256(abi.encodePacked(pubkey1, pubkey2));
    }else return keccak256((abi.encodePacked(pubkey2, pubkey1)));
   }

   //Send message 
   function sendMessage(address friend_key, string calldata _msg) external {
    //user already exist or not
    require(checkUserExists(msg.sender), "Create an account first!");
    require(checkUserExists(friend_key), "User not registered!");
    require(checkAlreadyFriends(msg.sender, friend_key), "You guys are not friends!");

    bytes32 chatCode = _getChatCode(msg.sender, friend_key);
    message memory newMsg = message(msg.sender, block.timestamp, _msg);
    allMessages[chatCode].push(newMsg);
   }

   //function for reading the message
   function readMessage(address friend_key) external view returns(message[] memory){
    bytes32 chatCode = _getChatCode(msg.sender, friend_key);
    return allMessages[chatCode];
   }

   //getting all the app users 
   function getAllAppUser() public view returns(AllUserStruck[] memory){
    return getAllUsers;
   }
}

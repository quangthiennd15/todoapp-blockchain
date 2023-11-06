// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TodoList {
    string[] private todoItems;

    function addTodoItem(string memory newItem) public {
        // require(bytes(newItem).length > 0, "input is not valid!");
        todoItems.push(newItem);
    }

    function deleteTodoItem(uint256 indexToDelete) public {
        require(indexToDelete < todoItems.length, "Invalid index to delete.");
        todoItems[indexToDelete] = todoItems[todoItems.length - 1];
        todoItems.pop();
    }

    function updateTodoItem(uint256 indexToUpdate, string memory newText) public{
        require( keccak256(abi.encodePacked(todoItems[indexToUpdate])) != keccak256(abi.encodePacked(newText)), "Not update");
        
        todoItems[indexToUpdate] = newText;
    }


    function getAllTodoItems() public view returns (string[] memory) {
        return todoItems;
    }
}
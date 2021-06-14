// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol";


contract SpaceMedals is ERC1155, Ownable {
    /* Ids for badges: 
    Badge for completing more than 1 level: 0
    Badge for completing more than 15 levels: 1
    Badge for completing more than 23 levels: 2
    */
    
    constructor() public ERC1155("https://script.google.com/macros/s/AKfycbzqyC2_TFeT0XFaZ-ko7WUFM4nw5GVlViS0cLDD8K1GWShNrLyxYZF7qJYx9-dyZw/exec?badge={id}") {}

    function setURI(string memory newuri) 
        public 
        onlyOwner 
    {
        _setURI(newuri);
    }
    
    function mint(address account, uint256 id, uint256 amount, bytes memory data)
        public
        onlyOwner
    {
        _mint(account, id, amount, data);
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }    
    
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        internal
        override
    {
        require(super.balanceOf(to, ids[0]) < 1, "Already awarded");
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
    
    
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    )
        public
        virtual
        override
    {}
    
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        public
        virtual
        override
    {}
    
}
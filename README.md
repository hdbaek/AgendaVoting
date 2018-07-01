Building a dApp on a smart contract using solidity.

The project's targets:
- handles the issue, buy, sell and transfer of stocks
- maintains the shareholders and their number of shares
- supports the minutes and decision from the shareholder's meeting
- store the documents for minutes using IPFS

This project includes:
- solidity program for smart contract
- client-side application which could be used by the shareholders
- using decentralized storage

Also it contains sources for User Interface.

It includes:
  - index.html, *.css for UI display
  - JavaScript for interface with smart contract
  - JavaScript libraries

User Interface:
 1. 'Setup' menu : 
    - Input msg.sender, recipient, number of stocks to send
    - In 'Register Agenda to be voted', input and register 
      (input example : subject : '1. option1 2.option2 3.option3', deadline : '24', no. of options : '3') 
    - Select one action and do 'Execute'
    - 'Store Minutes of shareholders' meeting' : After writting the minutes of the meeting, select this file and send to IPFS
    
 2 'Show Information' menu
    - In selection menu, required information can be retrieve
    
 3 'Vote for agenda' menu
    - select one option number and its votes and do voting

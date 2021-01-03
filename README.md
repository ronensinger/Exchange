Copyright Ronen Singer, All Rights Reserved

# Exchange
This is the backend for a prototype bitcoin futures exchange I made. The exchange and backend were never completed, but the sample front-end can be found at:
http://exchange.ronen.io/trade

The exchange was intended to be a bitcoin futures exchange, which simply put, allows bitcoin holders to place speculative bets on the  price of bitcoin by trading what's known as a swap contract.

![](http://ronen.io/exchange.PNG)

## Features
The backend features an order matching engine, located in the 
```
place.php
```
file located in the order folder.
The matching engine enables customer orders (limit and market) to execute against eachother (as if this were a stock exchange), in a strict price-time priority.

It features an innovative maker-taker fee model, so those who provide liquidity through limit orders, makers, are actually paid a rebate, rather than a fee.

It also features a fully operational API for users to place and cancel orders, liquidate positions, recieve market prices and trade data, as well tools for administrators to credit or even lock accounts.

There is also a sample server side websocket client to broadcast live trades. I never learned how to actual create an API nor a websocket system, so the sample is msot likely incredibly inefficient.

Lastly, passwords are hashed using sha256, to improve security, even though I'm sure a vulnerability exists somewhere.

## Getting Started
1. Create a MYSQL database
2. Run the (massive) 
```
main.sql
```
file located in the sql folder to generated tables to control administrative settings and user balances/trades/orders.

If you're interested in using the matching engine for yourself, just edit the configuration.php file in each folder and change
```
$servername = "Put your own host here";
$username = "Put your own user here";
$password = "Put your own database here";
$database = "Put your own password here";
```
to whatever your MYSQL password, username, database, and host are.
3. Have fun trading (most likely with yourself)!

While I wish I finished this project, I realized I wouldn't've been able to write all the code myself.
Apparatus' to control actual deposits and withdrawals of funds still haven't been written, and the matching engine is incredibly slow (since it's written in PHP) and can process a maximum of 1000 trades/cancellations a second, which would be insufficient for an actual exchange.

Written from scratch by Ronen Singer.

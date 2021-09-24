# How To Dockerize Your Hardhat Solidity Contract

This is the final code from the article "How To Dockerize Your Hardhat Solidity Contract On Localhost".
This is a base from the sample project provided by Hardhat but configured to use it with Docker.

If you got value from this and want to see more content from me, please follow/add me on:

- [twitter.com/codingwithmanny](https://twitter.com/codingwithmanny)
- [medium.com/@codingwithmanny](https://codingwithmanny.medium.com)
- [instagram.com/codingwithmanny](www.instagram.com/codingwithmanny/)

## Requirements

- NVM or NodeJS `v14.17.6`
- Docker `v20.10.8`
- Yarn `v1.22.10`

## Local Setup

1. Make sure you have the correct version of NodeJS

```bash
nvm install;
```

2. In dependencies

```bash
yarn install; # or just yarn
```

3. Compile contract

```bash
yarn compile:local; # this is for our client/node.js file
```

4. Build Docker image

```bash
docker build . -t hhdocker;
```

5. Run Docker image

```bash
# !NOTE: Double check no other programs are using that port 8545
docker run -it -d -p 8545:8545 --name myhd hhdocker;
```

6. Verify that container is running

```bash
docker logs myhd;
# Should see an output of wallet addresses and private keys
```

7. Compile local contract within Docker

```bash
docker exec -it myhd yarn compile:local;
```

8. Deploy local contract within Docker with custom task

```bash
docker exec -it myhd yarn deploy:local;
```

9. Create `.env` file used for out `client/node.js` file

```bash
# Ugly version
echo "CONTRACT_ADDRESS=$(docker exec -it myhd cat .contract)\nWALLET_ADDRESS=$(docker exec -it myhd cat .wallet;)" > .env;

# Prettier version
# export CONTRACT_ADDRESS="$(docker exec -it myhd cat .contract)";
# export WALLET_ADDRESS="$(docker exec -it myhd cat .wallet)";
# echo "CONTRACT_ADDRESS=$CONTRACT_ADDRESS\nWALLET_ADDRESS=$WALLET_ADDRESS" > .env;
# unset CONTRACT_ADDRESS;
# unset WALLET_ADDRESS;
```

10. Run our client

```bash
node client/node.js;
```

Voilà!

Don't forget to delete your container when you're done.

```bash
docker rm -f myhd;
```

## Running Tests

Main test files can be found in `/test`.

```bash
yarn test:local;
```

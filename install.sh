# compile game-common dependency
echo "===Installing game-common, please wait...==="
cd server/game-common
npm run compile
echo "===Installing server dependencies, please wait...==="
# install server dependencies
cd ..
npm i
echo "===Installing client dependencies, please wait...==="
# install client dependencies
cd ../client
npm i
echo "===Install done, please enjoy!==="
echo "For client, run client.sh"
echo "For server, run server.sh"

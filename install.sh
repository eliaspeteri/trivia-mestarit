# compile game-common dependencies
echo "===Installing game-common dependencies, please wait...==="
cd game-common
npm run compile
echo "===Installing server dependencies, please wait...==="
# install server dependencies
cd ../server
npm i
echo "===Installing client dependencies, please wait...==="
# install client dependencies
cd ../client
npm i
echo "===Install done, please enjoy!==="
echo "For client, run client.sh"
echo "For server, run server.sh"

echo "iniciando"

pm2 delete all
echo "iniciando gateway"
cd module-gateway
npm i
APP_NAME="GATEWAY"
pm2 start npm --name $APP_NAME -- run production

echo "***********************************************************************"
cd ..
echo "iniciando comunicacao"
cd module-comunicacao
npm i
touch .env
APP_NAME="comunicacao"
pm2 start npm --name $APP_NAME -- run production

echo "***********************************************************************"
cd ..
echo "iniciando notify"
cd module-notify
npm i
touch .env
echo "// RENOMEAR PARA .env e colocar os valores
module.exports = {
    email: 'jeanlucafp@gmail.com',
    senha: 'jeanlucaObscure345',
}" > .env
APP_NAME="notify"
pm2 start npm --name $APP_NAME -- run production

echo "***********************************************************************"
cd ..
echo "iniciando integracao"
cd module-integracao
npm i
APP_NAME="integracao"
pm2 start npm --name $APP_NAME -- run production

echo "***********************************************************************"
echo "                           FIM                                         "
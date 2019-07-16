echo "iniciando"

pm2 delete all
echo "iniciando gateway"
cd module-gateway
npm i

echo "***********************************************************************"
cd ..
echo "iniciando comunicacao"
cd module-comunicacao
npm i
touch .env

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

echo "***********************************************************************"
cd ..
echo "iniciando integracao"
cd module-integracao
npm i

echo "***********************************************************************"
echo "                           FIM                                         "
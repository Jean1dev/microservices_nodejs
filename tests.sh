echo 'iniciando testes unitarios'

cd module-notify
touch .env
echo "// RENOMEAR PARA .env e colocar os valores
module.exports = {
    email: 'rocketsolucoes@gmail.com',
    senha: 'rocket2019',
}" > .env

npm test

cd ..

cd module-integracao
npm test

cd ..
cd api-jaguar-commons
npm test
echo 'fim'
echo 'iniciando testes unitarios'

cd module-notify
touch .env
echo "// RENOMEAR PARA .env e colocar os valores
module.exports = {
    email: 'jeanlucafp@gmail.com',
    senha: 'jeanlucaObscure345',
}" > .env

npm test

cd ..

cd module-integracao
npm test
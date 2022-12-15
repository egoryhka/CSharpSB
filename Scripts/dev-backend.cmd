@echo off

set "ProdDir=Production"

cd ../
if not exist "%ProdDir%" mkdir Production

cd Frontend
start npm run build && move build ../Proxy

cd ../
cd Proxy
set ENV=production
npm start
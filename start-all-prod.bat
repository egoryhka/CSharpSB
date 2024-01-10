pushd Backend && pushd CSharpSbAPI && start dotnet run
popd && popd
pushd Frontend && start npm run build && mv build ../Proxy
popd
pushd Proxy && start npm run start

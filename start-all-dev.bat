pushd Backend && pushd CSharpSbAPI && start dotnet run
popd && popd
pushd Frontend && start npm run start
popd
pushd Proxy && start npm run start

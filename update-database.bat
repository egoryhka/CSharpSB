cd Backend\CSharpSbAPI

dotnet tool install --global dotnet-ef --version 6.*

dotnet ef migrations add PpDb_Migration_%random%%random%%random%
dotnet ef database update

pause
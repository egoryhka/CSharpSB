using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSharpSbAPI.Migrations
{
    public partial class PpDb_Migration_20141427120102 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NewTestProp",
                table: "Levels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NewTestProp",
                table: "Levels",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CSharpSbAPI.Migrations
{
    public partial class PpDb_Migration_v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MainCode",
                table: "Levels",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserCode",
                table: "Levels",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MainCode",
                table: "Levels");

            migrationBuilder.DropColumn(
                name: "UserCode",
                table: "Levels");
        }
    }
}

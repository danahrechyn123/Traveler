using Microsoft.EntityFrameworkCore.Migrations;

namespace Traveler.Migrations
{
    public partial class DropTravelTypeFromPlace : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TravelType",
                table: "Places");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TravelType",
                table: "Places",
                nullable: false,
                defaultValue: 0);
        }
    }
}

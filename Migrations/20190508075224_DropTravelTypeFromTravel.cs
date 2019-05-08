using Microsoft.EntityFrameworkCore.Migrations;

namespace Traveler.Migrations
{
    public partial class DropTravelTypeFromTravel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TravelType",
                table: "Travels");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TravelType",
                table: "Travels",
                nullable: false,
                defaultValue: 0);
        }
    }
}

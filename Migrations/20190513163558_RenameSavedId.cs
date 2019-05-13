using Microsoft.EntityFrameworkCore.Migrations;

namespace Traveler.Migrations
{
    public partial class RenameSavedId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "SavedPlaces",
                newName: "TravelId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TravelId",
                table: "SavedPlaces",
                newName: "UserId");
        }
    }
}

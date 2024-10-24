using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class LatestUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Remove the ambiguous foreign key columns
            migrationBuilder.DropForeignKey(
                name: "FK_Favourite_User_UserID1",
                table: "Favourite");

            migrationBuilder.DropIndex(
                name: "IX_Favourite_UserID1",
                table: "Favourite");

            migrationBuilder.DropColumn(
                name: "UserID1",
                table: "Favourite");
            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Favourite");

            // Add the correct foreign key column
            migrationBuilder.AddColumn<int>(
                name: "UserID",
                table: "Favourite",
                nullable: false);

            migrationBuilder.CreateIndex(
                name: "IX_Favourite_UserID",
                table: "Favourite",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Favourite_User_UserID",
                table: "Favourite",
                column: "UserID",
                principalSchema: "AdminSchema",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

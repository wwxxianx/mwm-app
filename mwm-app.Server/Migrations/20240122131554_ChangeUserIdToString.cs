using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserIdToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favourite_User_UserID1",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropIndex(
                name: "IX_Favourite_UserID1",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropColumn(
                name: "UserID1",
                schema: "AdminSchema",
                table: "Favourite");
            migrationBuilder.DropColumn(
                name: "ID",
                table: "User"
            );
            migrationBuilder.AddColumn<string>(
                name: "ID",
                table: "User",
                type: "nvarchar(450)",
                nullable: false
            );

            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                schema: "AdminSchema",
                table: "Favourite",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_Favourite_UserID",
                schema: "AdminSchema",
                table: "Favourite",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Favourite_User_UserID",
                schema: "AdminSchema",
                table: "Favourite",
                column: "UserID",
                principalSchema: "AdminSchema",
                principalTable: "User",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favourite_User_UserID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropIndex(
                name: "IX_Favourite_UserID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.AlterColumn<int>(
                name: "ID",
                schema: "AdminSchema",
                table: "User",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)")
                .Annotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AlterColumn<string>(
                name: "UserID",
                schema: "AdminSchema",
                table: "Favourite",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserID1",
                schema: "AdminSchema",
                table: "Favourite",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Favourite_UserID1",
                schema: "AdminSchema",
                table: "Favourite",
                column: "UserID1");

            migrationBuilder.AddForeignKey(
                name: "FK_Favourite_User_UserID1",
                schema: "AdminSchema",
                table: "Favourite",
                column: "UserID1",
                principalSchema: "AdminSchema",
                principalTable: "User",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

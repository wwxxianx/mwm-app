using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveBookIdFromBookCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_BookCategory_CategoryID",
                schema: "AdminSchema",
                table: "Book");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryID",
                schema: "AdminSchema",
                table: "Book",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Book_BookCategory_CategoryID",
                schema: "AdminSchema",
                table: "Book",
                column: "CategoryID",
                principalSchema: "AdminSchema",
                principalTable: "BookCategory",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_BookCategory_CategoryID",
                schema: "AdminSchema",
                table: "Book");

            migrationBuilder.AlterColumn<string>(
                name: "CategoryID",
                schema: "AdminSchema",
                table: "Book",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Book_BookCategory_CategoryID",
                schema: "AdminSchema",
                table: "Book",
                column: "CategoryID",
                principalSchema: "AdminSchema",
                principalTable: "BookCategory",
                principalColumn: "ID");
        }
    }
}

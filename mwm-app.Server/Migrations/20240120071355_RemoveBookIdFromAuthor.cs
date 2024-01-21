using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class RemoveBookIdFromAuthor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_Author_AuthorID",
                schema: "AdminSchema",
                table: "Book");

            migrationBuilder.DropColumn(
                name: "BookId",
                schema: "AdminSchema",
                table: "BookCategory");

            migrationBuilder.DropColumn(
                name: "BookID",
                schema: "AdminSchema",
                table: "Author");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorID",
                schema: "AdminSchema",
                table: "Book",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Book_Author_AuthorID",
                schema: "AdminSchema",
                table: "Book",
                column: "AuthorID",
                principalSchema: "AdminSchema",
                principalTable: "Author",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Book_Author_AuthorID",
                schema: "AdminSchema",
                table: "Book");

            migrationBuilder.AddColumn<string>(
                name: "BookId",
                schema: "AdminSchema",
                table: "BookCategory",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "AuthorID",
                schema: "AdminSchema",
                table: "Book",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<string>(
                name: "BookID",
                schema: "AdminSchema",
                table: "Author",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Book_Author_AuthorID",
                schema: "AdminSchema",
                table: "Book",
                column: "AuthorID",
                principalSchema: "AdminSchema",
                principalTable: "Author",
                principalColumn: "ID");
        }
    }
}

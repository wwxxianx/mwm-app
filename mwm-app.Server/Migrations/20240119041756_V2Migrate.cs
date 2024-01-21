using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class V2Migrate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "AdminSchema");

            migrationBuilder.RenameTable(
                name: "User",
                newName: "User",
                newSchema: "AdminSchema");

            migrationBuilder.RenameTable(
                name: "Favourite",
                newName: "Favourite",
                newSchema: "AdminSchema");

            migrationBuilder.RenameTable(
                name: "BookCategory",
                newName: "BookCategory",
                newSchema: "AdminSchema");

            migrationBuilder.RenameTable(
                name: "Book",
                newName: "Book",
                newSchema: "AdminSchema");

            migrationBuilder.RenameTable(
                name: "Author",
                newName: "Author",
                newSchema: "AdminSchema");

            migrationBuilder.RenameTable(
                name: "Admin",
                newName: "Admin",
                newSchema: "AdminSchema");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameTable(
                name: "User",
                schema: "AdminSchema",
                newName: "User");

            migrationBuilder.RenameTable(
                name: "Favourite",
                schema: "AdminSchema",
                newName: "Favourite");

            migrationBuilder.RenameTable(
                name: "BookCategory",
                schema: "AdminSchema",
                newName: "BookCategory");

            migrationBuilder.RenameTable(
                name: "Book",
                schema: "AdminSchema",
                newName: "Book");

            migrationBuilder.RenameTable(
                name: "Author",
                schema: "AdminSchema",
                newName: "Author");

            migrationBuilder.RenameTable(
                name: "Admin",
                schema: "AdminSchema",
                newName: "Admin");
        }
    }
}

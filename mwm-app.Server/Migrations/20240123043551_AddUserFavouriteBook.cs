using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddUserFavouriteBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserFavouriteBook",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    BookID = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserFavouriteBook", x => x.ID);
                    table.ForeignKey(
                        name: "FK_UserFavouriteBook_Book_BookID",
                        column: x => x.BookID,
                        principalSchema: "AdminSchema",
                        principalTable: "Book",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserFavouriteBook_User_UserID",
                        column: x => x.UserID,
                        principalSchema: "AdminSchema",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserFavouriteBook_BookID",
                schema: "AdminSchema",
                table: "UserFavouriteBook",
                column: "BookID");

            migrationBuilder.CreateIndex(
                name: "IX_UserFavouriteBook_UserID",
                schema: "AdminSchema",
                table: "UserFavouriteBook",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserFavouriteBook",
                schema: "AdminSchema");
        }
    }
}

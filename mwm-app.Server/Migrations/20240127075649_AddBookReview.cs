using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBookReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookReview",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReviewTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReviewDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    BookID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookReview", x => x.ID);
                    table.ForeignKey(
                        name: "FK_BookReview_Book_BookID",
                        column: x => x.BookID,
                        principalSchema: "AdminSchema",
                        principalTable: "Book",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_BookReview_User_UserID",
                        column: x => x.UserID,
                        principalSchema: "AdminSchema",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookReview_BookID",
                schema: "AdminSchema",
                table: "BookReview",
                column: "BookID");

            migrationBuilder.CreateIndex(
                name: "IX_BookReview_UserID",
                schema: "AdminSchema",
                table: "BookReview",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BookReview",
                schema: "AdminSchema");
        }
    }
}

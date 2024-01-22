using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddTopBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TopBook",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BookID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Ranking = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TopBook", x => x.ID);
                    table.ForeignKey(
                        name: "FK_TopBook_Book_BookID",
                        column: x => x.BookID,
                        principalSchema: "AdminSchema",
                        principalTable: "Book",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TopBook_BookID",
                schema: "AdminSchema",
                table: "TopBook",
                column: "BookID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TopBook",
                schema: "AdminSchema");
        }
    }
}

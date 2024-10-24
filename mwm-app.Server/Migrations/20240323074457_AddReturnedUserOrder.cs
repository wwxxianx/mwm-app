using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddReturnedUserOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ReturnedUserOrder",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserID = table.Column<int>(type: "int", nullable: false),
                    OrderID = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReturnedUserOrder", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ReturnedUserOrder_UserOrder_OrderID",
                        column: x => x.OrderID,
                        principalSchema: "AdminSchema",
                        principalTable: "UserOrder",
                        principalColumn: "ID");
                    table.ForeignKey(
                        name: "FK_ReturnedUserOrder_User_UserID",
                        column: x => x.UserID,
                        principalSchema: "AdminSchema",
                        principalTable: "User",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ReturnedItem",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    BookID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    ReturnedUserOrderID = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReturnedItem", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ReturnedItem_Book_BookID",
                        column: x => x.BookID,
                        principalSchema: "AdminSchema",
                        principalTable: "Book",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ReturnedItem_ReturnedUserOrder_ReturnedUserOrderID",
                        column: x => x.ReturnedUserOrderID,
                        principalSchema: "AdminSchema",
                        principalTable: "ReturnedUserOrder",
                        principalColumn: "ID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReturnedItem_BookID",
                schema: "AdminSchema",
                table: "ReturnedItem",
                column: "BookID");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnedItem_ReturnedUserOrderID",
                schema: "AdminSchema",
                table: "ReturnedItem",
                column: "ReturnedUserOrderID");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnedUserOrder_OrderID",
                schema: "AdminSchema",
                table: "ReturnedUserOrder",
                column: "OrderID");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnedUserOrder_UserID",
                schema: "AdminSchema",
                table: "ReturnedUserOrder",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ReturnedItem",
                schema: "AdminSchema");

            migrationBuilder.DropTable(
                name: "ReturnedUserOrder",
                schema: "AdminSchema");
        }
    }
}

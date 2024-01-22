using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangeUserToCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favourite_User_UserID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropTable(
                name: "User",
                schema: "AdminSchema");

            migrationBuilder.DropIndex(
                name: "IX_Favourite_UserID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropColumn(
                name: "UserID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.AddColumn<string>(
                name: "CustomerID",
                schema: "AdminSchema",
                table: "Favourite",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Customer",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Favourite_CustomerID",
                schema: "AdminSchema",
                table: "Favourite",
                column: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Favourite_Customer_CustomerID",
                schema: "AdminSchema",
                table: "Favourite",
                column: "CustomerID",
                principalSchema: "AdminSchema",
                principalTable: "Customer",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Favourite_Customer_CustomerID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropTable(
                name: "Customer",
                schema: "AdminSchema");

            migrationBuilder.DropIndex(
                name: "IX_Favourite_CustomerID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.DropColumn(
                name: "CustomerID",
                schema: "AdminSchema",
                table: "Favourite");

            migrationBuilder.AddColumn<string>(
                name: "UserID",
                schema: "AdminSchema",
                table: "Favourite",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "User",
                schema: "AdminSchema",
                columns: table => new
                {
                    ID = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.ID);
                });

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
    }
}

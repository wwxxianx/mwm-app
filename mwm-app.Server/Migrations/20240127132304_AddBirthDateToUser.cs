using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddBirthDateToUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                schema: "AdminSchema",
                table: "User",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                schema: "AdminSchema",
                table: "User",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                schema: "AdminSchema",
                table: "User");

            migrationBuilder.DropColumn(
                name: "Gender",
                schema: "AdminSchema",
                table: "User");
        }
    }
}

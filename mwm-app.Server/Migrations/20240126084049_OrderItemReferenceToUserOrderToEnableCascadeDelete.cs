using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mwm_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class OrderItemReferenceToUserOrderToEnableCascadeDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_UserOrder_UserOrderID",
                schema: "AdminSchema",
                table: "OrderItem");

            migrationBuilder.AlterColumn<string>(
                name: "UserOrderID",
                schema: "AdminSchema",
                table: "OrderItem",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_UserOrder_UserOrderID",
                schema: "AdminSchema",
                table: "OrderItem",
                column: "UserOrderID",
                principalSchema: "AdminSchema",
                principalTable: "UserOrder",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItem_UserOrder_UserOrderID",
                schema: "AdminSchema",
                table: "OrderItem");

            migrationBuilder.AlterColumn<string>(
                name: "UserOrderID",
                schema: "AdminSchema",
                table: "OrderItem",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItem_UserOrder_UserOrderID",
                schema: "AdminSchema",
                table: "OrderItem",
                column: "UserOrderID",
                principalSchema: "AdminSchema",
                principalTable: "UserOrder",
                principalColumn: "ID");
        }
    }
}

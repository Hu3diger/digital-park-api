using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace digitalpark.Migrations
{
    public partial class removed_inclusiondate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InclusionDate",
                table: "Users");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
       
            migrationBuilder.AddColumn<DateTime>(
                name: "InclusionDate",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}

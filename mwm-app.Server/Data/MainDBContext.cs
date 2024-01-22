﻿using Microsoft.EntityFrameworkCore;
using mwm_app.Server.Models;

namespace mwm_app.Server.Data
{
    public class MainDBContext : DbContext
    {
        public MainDBContext(DbContextOptions<MainDBContext> options) : base(options)
        {
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Favourite> Favourites { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<TopBook> TopBooks { get; set; }

        // Change default table name
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("AdminSchema");
            modelBuilder.Entity<Customer>().ToTable("Customer");
            modelBuilder.Entity<Book>().ToTable("Book");
            modelBuilder.Entity<Favourite>().ToTable("Favourite");
            modelBuilder.Entity<Admin>().ToTable("Admin");
            modelBuilder.Entity<BookCategory>().ToTable("BookCategory");
            modelBuilder.Entity<Author>().ToTable("Author");
            modelBuilder.Entity<TopBook>().ToTable("TopBook");
        }
    }
}


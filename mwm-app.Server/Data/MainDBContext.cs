using Microsoft.EntityFrameworkCore;
using mwm_app.Server.Models;

namespace mwm_app.Server.Data
{
    public class MainDBContext : DbContext
    {
        public MainDBContext(DbContextOptions<MainDBContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<BookCategory> BookCategories { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<TopBook> TopBooks { get; set; }
        public DbSet<UserFavouriteBook> UserFavouriteBooks { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<UserOrder> UserOrders { get; set; }
        public DbSet<BookReview> BookReviews { get; set; }
        // Change default table name
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("AdminSchema");
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Book>().ToTable("Book");
            modelBuilder.Entity<UserFavouriteBook>().ToTable("UserFavouriteBook");
            modelBuilder.Entity<Admin>().ToTable("Admin");
            modelBuilder.Entity<BookCategory>().ToTable("BookCategory");
            modelBuilder.Entity<Author>().ToTable("Author");
            modelBuilder.Entity<TopBook>().ToTable("TopBook");
            modelBuilder.Entity<ShoppingCart>().ToTable("ShoppingCart");
            modelBuilder.Entity<UserOrder>().ToTable("UserOrder");
            modelBuilder.Entity<BookReview>().ToTable("BookReview");
        }
    }
}


using Microsoft.EntityFrameworkCore;
namespace CRUD_dotnet_api.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<UserList> Users { get; set; }
  }
}

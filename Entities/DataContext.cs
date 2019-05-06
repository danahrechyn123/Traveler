using Microsoft.EntityFrameworkCore;

namespace Traveler.Entities
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {     
        }
                
        public DbSet<User> Users { get; set; }
        public DbSet<Country> Countries { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<PlaceToVisit> Places { get; set; }
        public DbSet<Travel> Travels { get; set; }

    }
}
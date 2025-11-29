using Microsoft.EntityFrameworkCore;

namespace TourAPI.DbContext
{
    public class tourDbContext: Microsoft.EntityFrameworkCore.DbContext
    {
        public tourDbContext(DbContextOptions<tourDbContext> options): base(options)
        {
            
        }
        public DbSet<TourAPI.Models.Tour> Tours { get; set; }
    }
}

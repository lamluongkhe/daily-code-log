using Microsoft.EntityFrameworkCore;

namespace tracnghiemAPI.Models
{
    public class TracNghiemDbContext:DbContext
    {
        public TracNghiemDbContext(DbContextOptions<TracNghiemDbContext> options):base(options)
        {
        }
        public DbSet<Question>Questions { get; set; }
        public DbSet<Participant> Participants { get; set; }
    }
}

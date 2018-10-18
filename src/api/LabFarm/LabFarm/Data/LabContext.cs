using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LabFarm.Models;

namespace LabFarm.Data
{
    public class LabContext : DbContext
    {
        public LabContext(DbContextOptions<LabContext> options) : base(options)
        {
        }

        public DbSet<Labfarm> Labfarms { get; set; }
        public DbSet<Sensor> Sensors { get; set; }
        public DbSet<Sensorvalue> Sensorvalues { get; set; }
        public DbSet<Plant> Plants { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Labfarm>().ToTable("Labfarm");
            modelBuilder.Entity<Sensor>().ToTable("Sensor");
            modelBuilder.Entity<Sensorvalue>().ToTable("Sensorvalue");
            modelBuilder.Entity<Plant>().ToTable("Plant");
        }
    }
}

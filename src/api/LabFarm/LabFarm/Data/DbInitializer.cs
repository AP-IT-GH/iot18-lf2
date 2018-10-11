using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LabFarm.Models;

namespace LabFarm.Data
{
    public class DbInitializer
    {
        public static void Initialize(LabContext context)
        {
            context.Database.EnsureCreated();

            if (context.Labfarms.Any())
            {
                return;
            }

            context.Labfarms.AddRange(
                new Labfarm { Name = "Lab 01"}
            );

            context.SaveChanges();

            context.Plants.AddRange(
                new Plant { Name = "Spathiphyllum", SeedTime = new DateTime(2018, 10, 11), Condition = "Stable" }
            );

            context.SaveChanges();

            context.Sensors.AddRange(
                new Sensor { SensorType = "Humidity", Value = 5}
            );

            context.SaveChanges();

            context.Sensorvalues.AddRange(
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 15, 51, 0), Value = 250, PlantId = 1 }
            );

            context.SaveChanges();
        }
    }
}

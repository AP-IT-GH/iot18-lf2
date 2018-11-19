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
                new Plant { Name = "Spathiphyllum", SeedTime = new DateTime(2018, 10, 11), Condition = "Stable", LabfarmId = 1 }
            );

            context.SaveChanges();

            context.Sensors.AddRange(
                new Sensor { SensorType = "HumidityAir", Value = 5, LabfarmId = 1},
                new Sensor { SensorType = "HumidityGround", Value = 5, LabfarmId = 1 },
                new Sensor { SensorType = "Temperature", Value = 7, LabfarmId = 1 },
                new Sensor { SensorType = "Light", Value = 7, LabfarmId = 1 },
                new Sensor { SensorType = "Ph", Value = 7, LabfarmId = 1 }
            );

            context.SaveChanges();

            context.Sensorvalues.AddRange(
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 1, 0, 0), Value = 250, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 2, 0, 0), Value = 250, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 3, 0, 0), Value = 240, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 4, 0, 0), Value = 254, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 5, 0, 0), Value = 560, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 6, 1, 0), Value = 121, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 7, 0, 0), Value = 250, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 8, 0, 0), Value = 240, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 9, 0, 0), Value = 254, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 10, 0, 0), Value = 560, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 11, 1, 0), Value = 121, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 12, 0, 0), Value = 250, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 13, 0, 0), Value = 240, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 14, 0, 0), Value = 254, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 15, 0, 0), Value = 560, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 16, 1, 0), Value = 121, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 17, 0, 0), Value = 250, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 18, 0, 0), Value = 240, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 19, 0, 0), Value = 254, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 20, 0, 0), Value = 560, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 21, 1, 0), Value = 121, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 22, 0, 0), Value = 250, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 23, 0, 0), Value = 240, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 0, 0, 0), Value = 254, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 1, 0, 0), Value = 560, SensorId = 1, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 1, 0, 0), Value = 250, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 2, 0, 0), Value = 250, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 3, 0, 0), Value = 240, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 4, 0, 0), Value = 254, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 5, 0, 0), Value = 560, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 6, 1, 0), Value = 121, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 7, 0, 0), Value = 250, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 8, 0, 0), Value = 240, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 9, 0, 0), Value = 254, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 10, 0, 0), Value = 560, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 11, 1, 0), Value = 121, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 12, 0, 0), Value = 250, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 13, 0, 0), Value = 240, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 14, 0, 0), Value = 254, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 15, 0, 0), Value = 560, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 16, 1, 0), Value = 121, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 17, 0, 0), Value = 250, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 18, 0, 0), Value = 240, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 19, 0, 0), Value = 254, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 20, 0, 0), Value = 560, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 21, 1, 0), Value = 121, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 22, 0, 0), Value = 250, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 23, 0, 0), Value = 240, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 0, 0, 0), Value = 254, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 1, 0, 0), Value = 560, SensorId = 2, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 1, 0, 0), Value = 250, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 2, 0, 0), Value = 250, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 3, 0, 0), Value = 240, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 4, 0, 0), Value = 254, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 5, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 6, 1, 0), Value = 121, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 7, 0, 0), Value = 250, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 8, 0, 0), Value = 240, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 9, 0, 0), Value = 254, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 10, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 11, 1, 0), Value = 121, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 12, 0, 0), Value = 250, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 13, 0, 0), Value = 240, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 14, 0, 0), Value = 254, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 15, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 16, 1, 0), Value = 121, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 17, 0, 0), Value = 250, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 18, 0, 0), Value = 240, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 19, 0, 0), Value = 254, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 20, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 21, 1, 0), Value = 121, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 22, 0, 0), Value = 250, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 23, 0, 0), Value = 240, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 0, 0, 0), Value = 254, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 1, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 3, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 1, 0, 0), Value = 250, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 2, 0, 0), Value = 250, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 3, 0, 0), Value = 240, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 4, 0, 0), Value = 254, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 5, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 6, 1, 0), Value = 121, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 7, 0, 0), Value = 250, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 8, 0, 0), Value = 240, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 9, 0, 0), Value = 254, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 10, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 11, 1, 0), Value = 121, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 12, 0, 0), Value = 250, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 13, 0, 0), Value = 240, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 14, 0, 0), Value = 254, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 15, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 16, 1, 0), Value = 121, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 17, 0, 0), Value = 250, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 18, 0, 0), Value = 240, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 19, 0, 0), Value = 254, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 20, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 21, 1, 0), Value = 121, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 22, 0, 0), Value = 250, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 23, 0, 0), Value = 240, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 0, 0, 0), Value = 254, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 1, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 4, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 1, 0, 0), Value = 250, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 2, 0, 0), Value = 250, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 3, 0, 0), Value = 240, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 4, 0, 0), Value = 254, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 5, 0, 0), Value = 560, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 6, 1, 0), Value = 121, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 7, 0, 0), Value = 250, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 8, 0, 0), Value = 240, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 9, 0, 0), Value = 254, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 10, 0, 0), Value = 560, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 11, 1, 0), Value = 121, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 12, 0, 0), Value = 250, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 13, 0, 0), Value = 240, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 14, 0, 0), Value = 254, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 15, 0, 0), Value = 560, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 16, 1, 0), Value = 121, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 17, 0, 0), Value = 250, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 18, 0, 0), Value = 240, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 19, 0, 0), Value = 254, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 20, 0, 0), Value = 560, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 11, 21, 1, 0), Value = 121, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 12, 22, 0, 0), Value = 250, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 13, 23, 0, 0), Value = 240, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 15, 0, 0, 0), Value = 254, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 1, 0, 0), Value = 560, SensorId = 5, PlantId = 1 },
                new Sensorvalue { Timestamp = new DateTime(2018, 10, 16, 2, 0, 0), Value = 560, SensorId = 5, PlantId = 1 }

            );

            context.SaveChanges();
        }
    }
}

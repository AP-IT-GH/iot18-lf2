using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LabFarm.Models
{
    public class Sensorvalue
    {
        public int SensorvalueId { get; set; }
        public double Value { get; set; }
        public DateTime Timestamp { get; set; }
        public int SensorId { get; set; }
        public int? PlantId { get; set; }

        [JsonIgnore]
        public Plant Plant { get; set; }
        [JsonIgnore]
        public Sensor Sensor { get; set; }
    }
}

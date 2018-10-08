using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LabFarm.Models
{
    public class Sensorvalue
    {
        public int SensorvalueId { get; set; }
        public int Value { get; set; }
        public DateTime Timestamp { get; set; }
        public int PlantId { get; set; }

        [JsonIgnore]
        public Plant Plant { get; set; }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LabFarm.Models
{
    public class Sensor
    {
        public int SensorId { get; set; }
        public string SensorType { get; set; }
        public int LabfarmId { get; set; }
        public int Value { get; set; }
        
        public ICollection<Sensorvalue> Sensorvalues { get; set; }
        [JsonIgnore]
        public Labfarm Labfarm { get; set; }
    }
}

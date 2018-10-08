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
        public int Value { get; set; }
    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LabFarm.Models
{
    public class Plant
    {
        public int PlantId { get; set; }
        public string Name { get; set; }
        public string Condition { get; set; }
        public int LabfarmId { get; set; }
        public DateTime SeedTime { get; set; }

        [JsonIgnore]
        public Labfarm Labfarm { get; set; }
    }
}

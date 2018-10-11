﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LabFarm.Models
{
    public class Labfarm
    {
        public int LabfarmId { get; set; }
        public string Name { get; set; }

        public ICollection<Sensor> Sensors { get; set; }
        public ICollection<Plant> Plants { get; set; }
    }
}

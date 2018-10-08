using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LabFarm.Data
{
    public class DbInitializer
    {
        public static void Initialize(LabContext context)
        {
            context.Database.EnsureCreated();
            
            
        }
    }
}

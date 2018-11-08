using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LabFarm.Data;
using Microsoft.EntityFrameworkCore;

namespace LabFarm.Controllers
{
    [Route("api/[controller]")]
    public class DataController : Controller
    {
        private readonly LabContext context;

        public DataController(LabContext context)
        {
            this.context = context;
        }

        public int Index()
        {
            return 5;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            var data = context.Labfarms.Include(t => t.Sensors).ToList();

            return new OkObjectResult(data);
        }

        [HttpGet("sensor")]
        public IActionResult GetSensorData()
        {
            var data = context.Labfarms.Include(t => t.Sensors).ThenInclude(t => t.Sensorvalues).ToList();

            return new OkObjectResult(data);
        }
    }
}
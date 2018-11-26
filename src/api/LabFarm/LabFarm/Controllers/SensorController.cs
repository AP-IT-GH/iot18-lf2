using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LabFarm.Data;
using Microsoft.EntityFrameworkCore;
using LabFarm.Models;

namespace LabFarm.Controllers
{
    [Route("api/[controller]")]
    public class SensorController : Controller
    {
        private readonly LabContext context;

        public SensorController(LabContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public IActionResult GetAllData()
        {
            var data = context.Labfarms.Include(t => t.Sensors).ToList();

            return new OkObjectResult(data);
        }

        [HttpGet("data")]
        public IActionResult GetSensorData()
        {
            var data = context.Labfarms.Include( t => t.Plants).Include(t => t.Sensors).ThenInclude(t => t.Sensorvalues).ToList();

            return new OkObjectResult(data);
        }

        [HttpPost]
        public IActionResult AddSensor([FromBody] Sensor newSensor)
        {
            var sensor = newSensor;

            if (context.Sensors.Where(t => t.SensorId == sensor.SensorId).Any())
            {
                return BadRequest();
            }

            context.Sensors.Add(sensor);
            context.SaveChanges();
            return new OkObjectResult(sensor);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSensor(int id)
        {
            var data = context.Sensors.Find(id);
            if (data == null)
            {
                return NotFound();
            }

            context.Sensors.Remove(data);
            context.SaveChanges();
            return NoContent();
        }


    }
}
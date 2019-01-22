using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LabFarm.Data;
using LabFarm.Models;
using Microsoft.AspNetCore.Cors;
using System.Dynamic;
using Newtonsoft.Json;
using System.Globalization;

namespace LabFarm.Controllers
{
    [Produces("application/json")]
    [EnableCors("CorsPolicy")]
    [Route("api/data")]
    public class SensorvalueController : Controller
    {
        private readonly LabContext _context;

        public SensorvalueController(LabContext context)
        {
            _context = context;
        }

        // GET: api/data
        [HttpGet]
        public async Task<IActionResult> GetSensorvaluesOverview()
        {
            
            var data = new
            {
                Lamp = "test",
                Water = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Water")).LastAsync(),
                Temperature = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Temperature")).LastAsync(),
                HumidityAir = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("HumidityAir")).LastAsync(),
                HumidityGround = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("HumidityGround")).LastAsync(),
                Light = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Light")).LastAsync(),
                Ph = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Ph")).LastAsync()
            };

            return new OkObjectResult(data);
        }

        // GET: api/data/(type)
        [HttpGet("{type}")]
        public async Task<IActionResult> GetSensorvaluesByType([FromRoute] string type)
        {
            var sensor = await _context.Sensorvalues.Include(s => s.Sensor).Where(t => t.Sensor.SensorType.Equals(type)).OrderBy(o => o.Timestamp).ToListAsync();
            if (sensor == null)
            {
                return NotFound();
            }

            return new OkObjectResult(sensor);
        }

        // GET: api/data/(type)
        [HttpGet("{type}/{date}")]
        public async Task<IActionResult> GetSensorvaluesByDate([FromRoute] string type, string date)
        {
            DateTime time = DateTime.Parse(date);
            var sensor = await _context.Sensorvalues.Where(t => t.Sensor.SensorType.Equals(type) && t.Timestamp.Date == time).OrderBy(o => o.Timestamp).ToListAsync();
            if (sensor == null)
            {
                return NotFound();
            }

            return new OkObjectResult(sensor);
        }

        // PUT: api/data/(id)
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSensorvalue([FromRoute] int id, [FromBody] Sensorvalue sensorvalue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sensorvalue.SensorvalueId)
            {
                return BadRequest();
            }

            _context.Entry(sensorvalue).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SensorvalueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/data
        [HttpPost]
        public async Task<IActionResult> PostSensorvalues()
        {
            var sensorvalue = Request.Headers["key"].ToString();
            //temp, bodemvochtigheid, ph, *, licht, luchtvochtigheid, water
            if (true == string.IsNullOrEmpty(sensorvalue))
            {
                return BadRequest();
            }

            int plantId = 1;
            string[] valueArray = sensorvalue.Split(" ; ");
            Sensorvalue[] sensorValues = new Sensorvalue[valueArray.Length-3];
            
            for(int i = 0; i<valueArray.Length - 3; i++)
            {
                double inputValue = double.Parse(valueArray[i], CultureInfo.InvariantCulture);
                sensorValues[i] = new Sensorvalue { Value = Math.Round(inputValue, 2, MidpointRounding.AwayFromZero), Timestamp = DateTime.Now.ToLocalTime(), SensorId = i+1, PlantId = plantId };
            }


            _context.Sensorvalues.AddRange(sensorValues);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // POST: api/data
        [HttpPost("{type}")]
        public async Task<IActionResult> PostSensorvalueFromType([FromBody] Sensorvalue sensorvalue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sensorvalues.Add(sensorvalue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSensorvalue", new { id = sensorvalue.SensorvalueId }, sensorvalue);
        }

        // DELETE: api/data/(id)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSensorvalue([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var sensorvalue = await _context.Sensorvalues.SingleOrDefaultAsync(m => m.SensorvalueId == id);
            if (sensorvalue == null)
            {
                return NotFound();
            }

            _context.Sensorvalues.Remove(sensorvalue);
            await _context.SaveChangesAsync();

            return Ok(sensorvalue);
        }

        private bool SensorvalueExists(int id)
        {
            return _context.Sensorvalues.Any(e => e.SensorvalueId == id);
        }
    }
}
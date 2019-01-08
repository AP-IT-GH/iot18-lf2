﻿using System;
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
            dynamic data = new ExpandoObject();
            data.Lamp = false;
            data.Temperature = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Temperature")).LastAsync();
            data.HumidityAir = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("HumidityAir")).LastAsync();
            data.HumidityGround = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("HumidityGround")).LastAsync();
            data.Light = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Light")).LastAsync();
            data.Ph = await _context.Sensorvalues.Where(s => s.Sensor.SensorType.Equals("Ph")).LastAsync();
            data.Water = 26;

            return new OkObjectResult(data);
        }

        // GET: api/data/(type)
        [HttpGet("{type}")]
        public async Task<IActionResult> GetSensorvaluesByType([FromRoute] string type)
        {
            var sensor = await _context.Sensors.Include(s => s.Sensorvalues).SingleOrDefaultAsync(s => s.SensorType.Equals(type));
            if (sensor == null)
            {
                return NotFound();
            }

            return new OkObjectResult(sensor);
        }

        // GET: api/data/(type)/(id)
        [HttpGet("{type}/{id}")]
        public async Task<IActionResult> GetSensorvalue([FromRoute] int id)
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

            return Ok(sensorvalue);
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
        public async Task<IActionResult> PostSensorvalues([FromBody] string sensorvalue)
        {
            //temp, bodemvochtigheid, *, *, licht, luchtvochtigheid, water
            if(true == string.IsNullOrEmpty(sensorvalue))
            {
                return BadRequest();
            }

            int plantId = 1;
            string[] valueArray = sensorvalue.Split(" ; ");
            //int[] sensorId = new int[] { 3, 2, 3, 3, 4, 1, 6 };
            Sensorvalue[] sensorValues = new Sensorvalue[valueArray.Length];
            
            for(int i = 0; i<valueArray.Length; i++)
            {
                sensorValues[i] = new Sensorvalue { Value = double.Parse(valueArray[i]), Timestamp = DateTime.Now, SensorId = i+1, PlantId = plantId };
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
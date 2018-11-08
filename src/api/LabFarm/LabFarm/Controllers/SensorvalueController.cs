using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LabFarm.Data;
using LabFarm.Models;

namespace LabFarm.Controllers
{
    [Produces("application/json")]
    [Route("api/Sensorvalue")]
    public class SensorvalueController : Controller
    {
        private readonly LabContext _context;

        public SensorvalueController(LabContext context)
        {
            _context = context;
        }

        // GET: api/Sensorvalue
        [HttpGet]
        public IEnumerable<Sensorvalue> GetSensorvalues()
        {
            return _context.Sensorvalues;
        }

        // GET: api/Sensorvalue/5
        [HttpGet("{id}")]
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

        // PUT: api/Sensorvalue/5
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

        // POST: api/Sensorvalue
        [HttpPost]
        public async Task<IActionResult> PostSensorvalue([FromBody] Sensorvalue sensorvalue)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Sensorvalues.Add(sensorvalue);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSensorvalue", new { id = sensorvalue.SensorvalueId }, sensorvalue);
        }

        // DELETE: api/Sensorvalue/5
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
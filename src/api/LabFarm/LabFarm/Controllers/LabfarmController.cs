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
    [Route("api/[controller]")]
    public class LabfarmController : Controller
    {
        private readonly LabContext _context;

        public LabfarmController(LabContext context)
        {
            _context = context;
        }

        // GET: api/Labfarm
        [HttpGet]
        public IEnumerable<Labfarm> GetLabfarms()
        {
            return _context.Labfarms;
        }

        // GET: api/Labfarm/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetLabfarm([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var labfarm = await _context.Labfarms.SingleOrDefaultAsync(m => m.LabfarmId == id);

            if (labfarm == null)
            {
                return NotFound();
            }

            return Ok(labfarm);
        }

        // PUT: api/Labfarm/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLabfarm([FromRoute] int id, [FromBody] Labfarm labfarm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != labfarm.LabfarmId)
            {
                return BadRequest();
            }

            _context.Entry(labfarm).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LabfarmExists(id))
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

        // POST: api/Labfarm
        [HttpPost]
        public async Task<IActionResult> PostLabfarm([FromBody] Labfarm labfarm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Labfarms.Add(labfarm);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLabfarm", new { id = labfarm.LabfarmId }, labfarm);
        }

        // DELETE: api/Labfarm/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLabfarm([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var labfarm = await _context.Labfarms.SingleOrDefaultAsync(m => m.LabfarmId == id);
            if (labfarm == null)
            {
                return NotFound();
            }

            _context.Labfarms.Remove(labfarm);
            await _context.SaveChangesAsync();

            return Ok(labfarm);
        }

        private bool LabfarmExists(int id)
        {
            return _context.Labfarms.Any(e => e.LabfarmId == id);
        }
    }
}
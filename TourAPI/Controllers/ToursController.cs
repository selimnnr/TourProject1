using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using TourAPI.DbContext;
using TourAPI.DTO;
using TourAPI.Models;

namespace TourAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        //private static List<Tour> _tours = new List<Tour>
        //{
        //    new Tour { Id = 1, Title = "Kapadokya Balon Turu", Price = 3500, StartDate = DateTime.Now.AddDays(10), FinishDate = DateTime.Now.AddDays(12) },
        //    new Tour { Id = 2, Title = "Karadeniz Yayla Turu", Price = 5000, StartDate = DateTime.Now.AddDays(20), FinishDate = DateTime.Now.AddDays(27) }
        //};

        // GET: api/tours
        // Tum turlari getirir
        private readonly tourDbContext _context;

        public ToursController(tourDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var _tours = await _context.Tours.ToListAsync();
            return Ok(_tours);
        }

        // GET: api/tours/5
        // Id'ye gore tek tur getirir
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var tour = await _context.Tours.FirstOrDefaultAsync(x => x.Id == id);
            if (tour == null)
            {
                return NotFound("Boyle bir tur bulunamadi.");
            }
            return Ok(tour);
        }

        // POST: api/tours
        // Yeni tur ekler
        [HttpPost]
        public async Task<IActionResult> Create(createTourDTO newTour)
        {
            var tour = new Tour
            {
                Title = newTour.Title,
                Price = newTour.Price,
                StartDate = newTour.StartDate,
                FinishDate = newTour.FinishDate
            };
            await _context.Tours.AddAsync(tour);
            await _context.SaveChangesAsync();
            return Ok("Tur Başarı ile Eklendi");
        }

        // PUT: api/tours/1
        // Var olan turu guncel
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, createTourDTO updatedTourDto)
        {
            var existingTour = await _context.Tours.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTour == null)
            {
                return NotFound("Güncellenecek tur bulunamadı.");
            }
            existingTour.Title = updatedTourDto.Title;
            existingTour.Price = updatedTourDto.Price;
            existingTour.StartDate = updatedTourDto.StartDate;
            existingTour.FinishDate = updatedTourDto.FinishDate;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/tours/5
        // Turu siler
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tour = await _context.Tours.FirstOrDefaultAsync(x => x.Id == id);
            if (tour == null)
            {
                return NotFound();
            }

            _context.Remove(tour);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
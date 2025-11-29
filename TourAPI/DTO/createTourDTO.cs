namespace TourAPI.DTO
{
    public class createTourDTO
    {
        public string Title { get; set; } 
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishDate { get; set; }
    }
}

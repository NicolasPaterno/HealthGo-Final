using System.ComponentModel.DataAnnotations;

namespace API_HealthGo.DTO
{
    public class ChangeEmailDTO
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        [EmailAddress]
        public string NewEmail { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
